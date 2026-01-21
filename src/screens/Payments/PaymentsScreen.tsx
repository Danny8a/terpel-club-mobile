import React, {useMemo, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

import {styles} from './PaymentsScreen.styles';

type PaymentMethod = 'Tarjeta' | 'PSE';

export default function PaymentsScreen() {
  const [method, setMethod] = useState<PaymentMethod>('Tarjeta');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const amountNumber = useMemo(() => Number(amount.replace(/[^\d]/g, '')), [amount]);

  const error = useMemo(() => {
    if (!amount.trim()) return 'Ingresa un monto.';
    if (!Number.isFinite(amountNumber) || amountNumber <= 0) return 'Monto inválido.';
    if (amountNumber < 1000) return 'El monto mínimo es 1.000 COP.';
    if (!reference.trim()) return 'Ingresa una referencia.';
    if (reference.trim().length < 4) return 'La referencia debe tener al menos 4 caracteres.';
    return '';
  }, [amount, amountNumber, reference]);

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
      <View style={styles.container}>
        <Text style={styles.title}>Pagos</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Método de pago</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            {(['Tarjeta', 'PSE'] as PaymentMethod[]).map(m => {
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

          <Text style={styles.label}>Monto (COP)</Text>
          <TextInput
            value={amount}
            onChangeText={t => {
              setSubmitted(false);
              setAmount(t);
            }}
            placeholder="Ej: 12000"
            keyboardType="number-pad"
            style={styles.input}
            placeholderTextColor="#999"
          />
          <Text style={styles.helper}>Mínimo: 1.000 COP</Text>

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
                Monto: {amountNumber.toLocaleString('es-CO')} COP {'\n'}
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
      </View>
    </KeyboardAvoidingView>
  );
}
