import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './MovementsScreen.styles';

import {fetchMovements, type Movement} from '../../api/terpelApi';
import type {ApiError} from '../../types/api';

const PAGE_SIZE = 4;

const MovementsScreen: React.FC = () => {
  const [items, setItems] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovements();
        if (alive) {
          setItems(data);
          setPage(1);
        }
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

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  }, [items.length]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, page]);

  const renderItem = ({item}: {item: Movement}) => {
    const sign = item.puntos > 0 ? '+' : '';
    const puntosText = `${sign}${item.puntos.toLocaleString('es-CO')} pts`;

    return (
      <View style={styles.movementCard}>
        <View style={styles.movementRow}>
          <Text style={styles.movementTitle}>{item.descripcion}</Text>
          <Text
            style={[
              styles.movementPoints,
              item.puntos < 0 ? styles.negative : styles.positive,
            ]}>
            {puntosText}
          </Text>
        </View>

        <View style={styles.movementMetaRow}>
          <Text style={styles.movementMeta}>
            {item.fecha}{item.hora ? ` • ${item.hora}` : ''}
          </Text>
          {item.tipo ? <Text style={styles.movementMeta}>{item.tipo}</Text> : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimientos</Text>

      {error ? (
        <Text style={styles.error}>
          {error.message} {error.status ? `(HTTP ${error.status})` : ''}
        </Text>
      ) : null}

      {loading ? (
        <Text style={styles.loading}>Cargando...</Text>
      ) : (
        <>
          <FlatList
            data={pageItems}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 12}}
          />

          <View style={styles.pagination}>
            <TouchableOpacity
              style={[styles.pageBtn, page <= 1 && styles.pageBtnDisabled]}
              disabled={page <= 1}
              onPress={() => setPage((p) => Math.max(1, p - 1))}>
              <Text style={styles.pageBtnText}>Anterior</Text>
            </TouchableOpacity>

            <Text style={styles.pageInfo}>
              {page} / {totalPages}
            </Text>

            <TouchableOpacity
              style={[styles.pageBtn, page >= totalPages && styles.pageBtnDisabled]}
              disabled={page >= totalPages}
              onPress={() => setPage((p) => Math.min(totalPages, p + 1))}>
              <Text style={styles.pageBtnText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default MovementsScreen;
