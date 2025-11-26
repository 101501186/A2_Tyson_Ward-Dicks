import React, { useState } from 'react';
import {
 StyleSheet,
 View,
 Text,
 TextInput,
 Button,
} from 'react-native';

const API_KEY = 'fca_live_JxwBC4Qa17X1jy9yzfpWoEWYlSNmsfK7MgBOb0wC';

export default function HomeScreen({ navigation }) {
    const [baseCurrency, setBaseCurrency] = useState('CAD'); // default is CAD
    const [destCurrency, setDestCurrency] = useState('');
    const [amount, setAmount] = useState('1'); // default is 1
    const [rate, setRate] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');


    const validateInputs = () => {
        const base = baseCurrency.trim().toUpperCase();
        const dest = destCurrency.trim().toUpperCase();
        const amtNumber = parseFloat(amount);

        // currency code validation
        const codeRegex = /^[A-Z]{3}$/;

        if (!codeRegex.test(base) || !codeRegex.test(dest)) {
            setError(
            'Currency codes must be 3-letter uppercase codes (e.g., CAD, USD, EUR).'
            );
            setRate(null);
            setResult(null);
            return null;
        }

        if (isNaN(amtNumber) || amtNumber <= 0) {
            setError('Amount must be a positive number.');
            setRate(null);
            setResult(null);
            return null;
        }

        setError('');
        return { base, dest, amtNumber };
    };

    const handleConvert = async () => {
        const values = validateInputs();
        if (!values) return;

        const { base, dest, amtNumber } = values;

        try {
            const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${base}&currencies=${dest}`;
            const response = await fetch(url);

            if (!response.ok) {
            throw new Error('Network error: ' + response.status);
            }

            const json = await response.json();

            // handle API-level errors (invalid key, etc.)
            if (json.error) {
            throw new Error(json.error.message || 'API error.');
            }

            const rateValue = json.data && json.data[dest];
            if (!rateValue) {
            throw new Error('Exchange rate for that currency was not found.');
            }

            const converted = amtNumber * rateValue;
            setRate(rateValue);
            setResult(converted);
            setError('');
        } catch (err) {
            setRate(null);
            setResult(null);
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Currency Converter</Text>

            <Text style={styles.label}>Base currency code</Text>
            <TextInput
            style={styles.input}
            value={baseCurrency}
            onChangeText={setBaseCurrency}
            autoCapitalize="characters"
            maxLength={3}
            />

            <Text style={styles.label}>Destination currency code</Text>
            <TextInput
            style={styles.input}
            value={destCurrency}
            onChangeText={setDestCurrency}
            autoCapitalize="characters"
            maxLength={3}
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            />

            <Button title="Convert" onPress={handleConvert} />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {result !== null && rate !== null && (
            <View style={styles.resultBox}>
                <Text>Exchange rate used: {rate}</Text>
                <Text>
                {parseFloat(amount).toFixed(2)} {baseCurrency.toUpperCase()} ={' '}
                {result.toFixed(2)} {destCurrency.toUpperCase()}
                </Text>
            </View>
            )}

            <View style={{ marginTop: 24 }}>
                <Button
                    title="About"
                    onPress={() =>
                    navigation.navigate('About', {
                        name: 'Tyson Ward-Dicks',
                        studentId: '101501186',
                    })
                    }
                />
            </View>
        </View>
    );
}    