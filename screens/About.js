import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen({ route }) {
    const { name, studentId } = route.params || {};
    return(
        <View style={styles.container}>
            <Text style={styles.title}>About This App</Text>

            <Text style={styles.text}>Name: {name || 'Tyson Ward-Dicks'}</Text>
        </View>
    );

}