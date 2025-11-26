import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen({ route }) {
    const { name, studentId } = route.params || {};
    return(
        <View style={styles.container}>
            <Text style={styles.title}>About This App</Text>

            <Text style={styles.text}>Name: {name || 'Tyson Ward-Dicks'}</Text>
            <Text style={styles.text}>Student ID: {studentId || '101501186'}</Text>

            <Text style={[styles.text, { marginTop: 16 }]}>
                This React Native application converts an amount from one currency to
                another using live exchange rates from FreeCurrencyAPI.
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   padding: 24,
   justifyContent: 'center',
 }
});