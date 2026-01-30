import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TextInput, FlatList, Image, ActivityIndicator} from 'react-native';

import {styles} from './CatalogScreen.styles';
import {fetchCatalog, type CatalogProduct} from '../../api/terpelApi';
import type {ApiError} from '../../types/api';

export default function CatalogScreen() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCatalog();
        if (!alive) return;

        setItems(data);
      } catch (e: any) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter(p => {
      const name = (p.nombre || '').toLowerCase();
      const desc = (p.descripcion || '').toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [query, items]);

  const renderItem = ({item}: {item: CatalogProduct}) => (
    <View style={styles.card}>
      {item.imagen ? (
        <Image source={{uri: item.imagen}} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Sin imagen</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.description}>{item.descripcion}</Text>

        <Text style={styles.price}>
          {item.puntos.toLocaleString('es-CO')} pts
        </Text>

        {!item.disponible ? (
          <Text style={styles.outOfStock}>Agotado</Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo</Text>

      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar producto..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {loading ? (
        <View style={{paddingTop: 20}}>
          <ActivityIndicator />
          <Text style={{textAlign: 'center', marginTop: 8}}>Cargando catálogo...</Text>
        </View>
      ) : error ? (
        <Text style={styles.empty}>
          {error.message} {error.status ? `(HTTP ${error.status})` : ''}
        </Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Sin resultados.</Text>}
        />
      )}
    </View>
  );
}
