import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill all fields');
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Login failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex:1, padding:20, justifyContent:'center' }}>
      <Text style={{ fontSize:28, fontWeight:'bold', marginBottom:20 }}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}
        style={{ borderWidth:1, padding:10, marginBottom:10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry
        style={{ borderWidth:1, padding:10, marginBottom:10 }} />
      <TouchableOpacity onPress={handleLogin}
        style={{ backgroundColor:'#1976D2', padding:12, alignItems:'center', borderRadius:8 }}>
        {loading ? <ActivityIndicator color="#fff"/> : <Text style={{ color:'#fff' }}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{ marginTop:15 }}>
        <Text style={{ textAlign:'center', color:'#1976D2' }}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
