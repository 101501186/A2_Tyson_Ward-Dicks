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
}    