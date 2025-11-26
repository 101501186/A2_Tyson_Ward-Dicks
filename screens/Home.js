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
}    