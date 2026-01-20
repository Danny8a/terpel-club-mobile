import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import {getMovementsMock, Movement} from '../../mocks/movements.mock';
import {styles} from './MovementsScreen.styles';

const PAGE_SIZE = 4;

export default function MovementsScreen() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Movement[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const res = getMovementsMock(page, PAGE_SIZE);
    setItems(res.items);
    setTotal(res.total);
  }, [page]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total],
  );

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const renderItem = ({item}: {item: Movement}) => {
    const pointsStyle =
      item.points >= 0 ? styles.pointsPositive : styles.pointsNegative;

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={pointsStyle}>
          {item.points >= 0 ? '+' : ''}
          {item.points} pts
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimientos</Text>

      <FlatList
        data={items}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
      />

      {/* Paginación */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={!canPrev}
          onPress={() => setPage(p => Math.max(1, p - 1))}
          style={[
            styles.paginationButton,
            canPrev
              ? styles.paginationButtonEnabled
              : styles.paginationButtonDisabled,
          ]}>
          <Text style={styles.paginationButtonText}>Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.paginationText}>
          Página {page} de {totalPages}
        </Text>

        <TouchableOpacity
          disabled={!canNext}
          onPress={() => setPage(p => Math.min(totalPages, p + 1))}
          style={[
            styles.paginationButton,
            canNext
              ? styles.paginationButtonEnabled
              : styles.paginationButtonDisabled,
          ]}>
          <Text style={styles.paginationButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
