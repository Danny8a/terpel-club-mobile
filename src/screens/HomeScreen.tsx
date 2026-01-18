import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../config/colors';
import {styles} from './HomeScreen.styles';

const HomeScreen: React.FC = () => {
  // Datos mock para demostración
  const user = {
    nombre: 'Juan Pérez',
    puntos: 5420,
  };

  const products = [
    {
      id: 1,
      nombre: 'Gasolina Corriente',
      descripcion: 'Combustible de alta calidad para tu vehículo',
      precio: 12000,
      imagen: 'https://via.placeholder.com/300x200/D32F2F/FFFFFF?text=Gasolina',
    },
    {
      id: 2,
      nombre: 'Gasolina Extra',
      descripcion: 'Mayor octanaje para mejor rendimiento',
      precio: 14000,
      imagen: 'https://via.placeholder.com/300x200/B71C1C/FFFFFF?text=Extra',
    },
    {
      id: 3,
      nombre: 'ACPM',
      descripcion: 'Combustible diésel de excelente calidad',
      precio: 11000,
      imagen: 'https://via.placeholder.com/300x200/C62828/FFFFFF?text=ACPM',
    },
    {
      id: 4,
      nombre: 'Lubricante',
      descripcion: 'Aceite de motor sintético premium',
      precio: 45000,
      imagen: 'https://via.placeholder.com/300x200/E53935/FFFFFF?text=Aceite',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.nombre[0].toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Terpel Club</Text>
            <Text style={styles.headerSubtitle}>{user.nombre}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsLabel}>Puntos Disponibles</Text>
            <TouchableOpacity style={styles.historyButton}>
              <Text style={styles.historyButtonText}>Ver Historial →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.pointsValue}>
            {user.puntos.toLocaleString('es-CO')}
          </Text>
          <Text style={styles.pointsEquivalent}>
            ≈ ${user.puntos.toLocaleString('es-CO')} COP
          </Text>
        </View>

        {/* Catalog */}
        <View style={styles.catalogContainer}>
          <Text style={styles.sectionTitle}>Catálogo de Productos</Text>

          {products.map(product => (
            <View key={product.id} style={styles.productCard}>
              <Image
                source={{uri: product.imagen}}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.nombre}</Text>
                <Text style={styles.productDescription}>
                  {product.descripcion}
                </Text>
                <Text style={styles.productPrice}>
                  ${product.precio.toLocaleString('es-CO')}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;