import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) return Alert.alert('Error', 'Please fill all fields');
    try {
      setLoading(true);
      await signUp(name, email, password);
    } catch (err) {
      console.error(err.response?.data || err.message);
      Alert.alert('Signup failed', err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex:1, padding:20, justifyContent:'center' }}>
      <Text style={{ fontSize:28, fontWeight:'bold', marginBottom:20 }}>Create Account</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName}
        style={{ borderWidth:1, padding:10, marginBottom:10 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail}
        style={{ borderWidth:1, padding:10, marginBottom:10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry
        style={{ borderWidth:1, padding:10, marginBottom:10 }} />
      <TouchableOpacity onPress={handleSignup}
        style={{ backgroundColor:'#388E3C', padding:12, alignItems:'center', borderRadius:8 }}>
        {loading ? <ActivityIndicator color="#fff"/> : <Text style={{ color:'#fff' }}>Sign Up</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop:15 }}>
        <Text style={{ textAlign:'center', color:'#1976D2' }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
