import React, {useMemo, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, FlatList} from 'react-native';

import {styles} from './PaymentsScreen.styles';
import {fetchClientInfo, fetchCatalog} from '../../api/terpelApi';
import {useApiCall} from '../../hooks/useApiCall';

type PaymentMethod = 'Tarjeta' | 'PSE' | 'Puntos';

export default function PaymentsScreen() {
  const [method, setMethod] = useState<PaymentMethod>('Tarjeta');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Obtener puntos del servicio
  const {data: clientInfo} = useApiCall(() => fetchClientInfo());
  const pointsBalance = clientInfo?.puntosDisponibles ?? 0;

  // Obtener productos del servicio
  const {data: products} = useApiCall(() => fetchCatalog());
  const catalogProducts = products ?? [];

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = new Set<string>();
    catalogProducts.forEach(p => {
      if (p.categoria) cats.add(p.categoria);
    });
    return Array.from(cats).sort();
  }, [catalogProducts]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return catalogProducts.filter(p => {
      if (filterCategory && p.categoria !== filterCategory) return false;
      if (showOnlyAvailable && !p.disponible) return false;
      
      // Búsqueda
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          p.nombre.toLowerCase().includes(query) ||
          p.descripcion.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      return true;
    });
  }, [catalogProducts, filterCategory, showOnlyAvailable, searchQuery]);

  const amountNumber = useMemo(() => Number(amount.replace(/[^\d]/g, '')), [amount]);

  const error = useMemo(() => {
    if (!amount.trim()) return 'Ingresa un monto.';
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) return 'Monto inválido.';
    
    if (method === 'Puntos') {
      if (amountNumber < 100) return 'El monto mínimo es 100 puntos.';
      if (amountNumber > pointsBalance) return `No tienes puntos suficientes. Disponibles: ${pointsBalance}`;
    } else {
      if (amountNumber < 1000) return 'El monto mínimo es 1.000 COP.';
    }
    
    if (!reference.trim()) return 'Ingresa una referencia.';
    if (reference.trim().length < 4) return 'La referencia debe tener al menos 4 caracteres.';
    return '';
  }, [amount, amountNumber, reference, method, pointsBalance]);

  const disabled = Boolean(error);

  const onPay = () => {
    setSubmitted(true);
  };

  const onReset = () => {
    setSubmitted(false);
    setAmount('');
    setReference('');
    setMethod('Tarjeta');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Pagos</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Método de pago</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            {(['Tarjeta', 'PSE', 'Puntos'] as PaymentMethod[]).map(m => {
              const active = method === m;
              return (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMethod(m)}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    backgroundColor: active ? '#FDECEC' : '#F4F4F4',
                    borderWidth: 1,
                    borderColor: active ? '#D32F2F' : 'transparent',
                  }}>
                  <Text style={{fontWeight: '800', color: active ? '#D32F2F' : '#666'}}>
                    {m}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {method === 'Puntos' && (
            <View style={styles.pointsCard}>
              <Text style={styles.pointsLabel}>Puntos disponibles</Text>
              <Text style={styles.pointsBalance}>{pointsBalance.toLocaleString('es-CO')}</Text>
            </View>
          )}

          <Text style={styles.label}>{method === 'Puntos' ? 'Puntos' : 'Monto (COP)'}</Text>
          <TextInput
            value={amount}
            onChangeText={t => {
              setSubmitted(false);
              setAmount(t);
            }}
            placeholder={method === 'Puntos' ? 'Ej: 500' : 'Ej: 12000'}
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor="#999"
          />
          <Text style={styles.helper}>
            {method === 'Puntos' ? 'Mínimo: 100 puntos' : 'Mínimo: 1.000 COP'}
          </Text>

          <Text style={styles.label}>Referencia</Text>
          <TextInput
            value={reference}
            onChangeText={t => {
              setSubmitted(false);
              setReference(t);
            }}
            placeholder="Ej: TERPEL-0001"
            style={styles.input}
            placeholderTextColor="#999"
            autoCapitalize="characters"
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          {!submitted ? (
            <TouchableOpacity
              disabled={disabled}
              onPress={onPay}
              style={[styles.button, disabled && styles.buttonDisabled]}>
              <Text style={styles.buttonText}>
                Pagar con {method}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                Pago simulado exitoso 
              </Text>
              <Text style={{marginTop: 6, color: '#1B7F3A'}}>
                Método: {method} {'\n'}
                {method === 'Puntos' 
                  ? `Puntos: ${amountNumber.toLocaleString('es-CO')}` 
                  : `Monto: ${amountNumber.toLocaleString('es-CO')} COP`
                } {'\n'}
                Ref: {reference.trim().toUpperCase()}
              </Text>

              <TouchableOpacity
                onPress={onReset}
                style={[styles.button, {marginTop: 12}]}>
                <Text style={styles.buttonText}>Nuevo pago</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {method === 'Puntos' && (
          <View style={{marginTop: 20}}>
            <Text style={styles.title}>Catálogo de Productos</Text>

            {/* Buscador */}
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar productos..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />

            {/* Filtros */}
            <View style={styles.filterContainer}>
              {/* Filtro por categoría */}
              <View style={{marginBottom: 12}}>
                <Text style={styles.filterLabel}>Categoría</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 8}}>
                  <TouchableOpacity
                    onPress={() => setFilterCategory(null)}
                    style={[
                      styles.filterChip,
                      !filterCategory && styles.filterChipActive,
                    ]}>
                    <Text style={[
                      styles.filterChipText,
                      !filterCategory && styles.filterChipTextActive,
                    ]}>
                      Todos
                    </Text>
                  </TouchableOpacity>
                  {categories.map(cat => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setFilterCategory(cat)}
                      style={[
                        styles.filterChip,
                        filterCategory === cat && styles.filterChipActive,
                      ]}>
                      <Text style={[
                        styles.filterChipText,
                        filterCategory === cat && styles.filterChipTextActive,
                      ]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Filtro por disponibilidad */}
              <TouchableOpacity
                onPress={() => setShowOnlyAvailable(!showOnlyAvailable)}
                style={styles.checkboxContainer}>
                <View style={[styles.checkbox, showOnlyAvailable && styles.checkboxActive]}>
                  {showOnlyAvailable && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Solo disponibles</Text>
              </TouchableOpacity>
            </View>

            {/* Resultados */}
            <Text style={styles.resultsCount}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </Text>

            <FlatList
              data={filteredProducts}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const pointsCost = item.puntos;
                const canAfford = pointsCost <= pointsBalance && item.disponible;
                return (
                  <View style={[styles.productCard, !canAfford && styles.productCardDisabled]}>
                    <View style={{flex: 1}}>
                      <Text style={styles.productName}>{item.nombre}</Text>
                      <Text style={styles.productDescription}>{item.descripcion}</Text>
                      <Text style={[styles.productPoints, !canAfford && {color: '#999'}]}>
                        {pointsCost.toLocaleString('es-CO')} puntos
                      </Text>
                    </View>
                    <View style={{marginLeft: 12}}>
                      <TouchableOpacity
                        disabled={!canAfford}
                        style={[
                          styles.productButton,
                          !canAfford && styles.productButtonDisabled,
                        ]}
                        onPress={() => {
                          setAmount(pointsCost.toString());
                          setReference(`PROD-${item.id}`);
                          setSubmitted(false);
                        }}>
                        <Text style={[
                          styles.productButtonText,
                          !canAfford && {color: '#999'},
                        ]}>
                          {canAfford ? 'Usar' : 'Sin puntos'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={
                <View style={{alignItems: 'center', paddingVertical: 20}}>
                  <Text style={{color: '#999', fontSize: 14}}>
                    No hay productos que coincidan con los filtros
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
