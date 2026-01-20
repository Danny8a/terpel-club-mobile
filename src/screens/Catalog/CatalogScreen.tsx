import React, {useMemo, useState} from 'react';
import {View, Text, TextInput, FlatList, Image} from 'react-native';

import {CATALOG_PRODUCTS, CatalogProduct} from '../../mocks/catalog.mock';
import {styles} from './CatalogScreen.styles';

export default function CatalogScreen() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG_PRODUCTS;

    return CATALOG_PRODUCTS.filter(p => {
      const name = p.name.toLowerCase();
      const desc = p.description.toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [query]);

const renderItem = ({item}: {item: CatalogProduct}) => (
  <View style={styles.card}>
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>
        ${item.price.toLocaleString('es-CO')}
      </Text>
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

      <FlatList
        data={filtered}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Sin resultados.</Text>}
      />
    </View>
  );
}
