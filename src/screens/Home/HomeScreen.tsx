import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './HomeScreen.styles';
import { COLORS } from '../../config/colors';
import { logout } from '../../store/slices/authSlice';
import type { RootState } from '../../store/store';

import { fetchClientInfo, type ClientInfo, fetchCatalog, type CatalogProduct } from '../../api/terpelApi';
import type { ApiError } from '../../types/api';

const HOME_CATALOG_LIMIT = 4;

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const auth = useSelector((state: RootState) => state.auth);

  const [client, setClient] = useState<ClientInfo | null>(null);
  const [catalog, setCatalog] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const [shuffleSeed, setShuffleSeed] = useState(0);

  const onLogout = () => dispatch(logout());

  const goToMovements = () => navigation.navigate('Movements');
  const goToCatalog = () => navigation.navigate('Catalog'); // <-- ajusta si tu ruta se llama distinto

  const refreshProducts = () => {
    setShuffleSeed((s) => s + 1);
  };

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [info, cat] = await Promise.all([
          fetchClientInfo(),
          fetchCatalog(),
        ]);

        if (!alive) return;

        setClient(info);
        setCatalog(cat);
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

  const displayName = useMemo(() => {
    if (loading) return 'Cargando...';
    if (error) return 'Error al cargar';
    return client?.nombreCompleto || 'Sin nombre';
  }, [loading, error, client]);

  const avatarLetter = useMemo(() => {
    return (displayName?.[0] || 'T').toUpperCase();
  }, [displayName]);

  const puntos = client?.puntosDisponibles ?? 0;

  const homeCatalog = useMemo(() => {
    if (!catalog.length) return [];
    return shuffleArray(catalog).slice(0, HOME_CATALOG_LIMIT);
  }, [catalog, shuffleSeed]);

  const renderProduct = ({ item }: { item: CatalogProduct }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.imagen || 'https://via.placeholder.com/300x200?text=Sin+Imagen' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nombre}</Text>
        <Text style={styles.productDescription}>{item.descripcion}</Text>
        <Text style={styles.productPrice}>
          {item.puntos.toLocaleString('es-CO')} pts
        </Text>

        {!item.disponible ? (
          <Text style={styles.outOfStock}>Agotado</Text>
        ) : null}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Terpel Club</Text>
            <Text style={styles.headerSubtitle}>
              {displayName}
            </Text>
            {auth.documentNumber && (
              <Text style={styles.headerDocument}>
                {auth.documentType} {auth.documentNumber}
              </Text>
            )}

            {error ? (
              <Text style={{ marginTop: 6, color: '#fff', opacity: 0.9 }}>
                {error.message} {error.status ? `(HTTP ${error.status})` : ''}
              </Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsLabel}>Puntos Disponibles</Text>

            <TouchableOpacity style={styles.historyButton} onPress={goToMovements}>
              <Text style={styles.historyButtonText}>Ver Historial →</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.pointsValue}>
            {puntos.toLocaleString('es-CO')}
          </Text>
        </View>

        {/* Catalog Preview */}
        <View style={styles.catalogContainer}>
          <View style={styles.catalogHeaderRow}>
            <Text style={styles.sectionTitle}>Catálogo de Productos</Text>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={refreshProducts}
                accessibilityLabel="Actualizar productos"
              >
                <MaterialCommunityIcons 
                  name="refresh" 
                  size={20} 
                  color="#000000" 
                />
              </TouchableOpacity>


              <TouchableOpacity style={styles.seeAllButton} onPress={goToCatalog}>
                <Text style={styles.seeAllButtonText}>Ver todo →</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={homeCatalog}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
            scrollEnabled={false}
            ListEmptyComponent={
              loading ? (
                <Text style={styles.emptyText}>Cargando catálogo...</Text>
              ) : (
                <Text style={styles.emptyText}>No hay productos.</Text>
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
