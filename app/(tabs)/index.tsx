import { Image, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

  const navigation = useNavigation();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#b4b4bf', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/12345.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
       <ThemedText type="title" style={{ color: 'yellow' }}>PNG CENSUS 2024</ThemedText>
        </ThemedView>

 <ThemedView style={styles.stepContainer}>
<ThemedText type="subtitle" style={{ color: 'red', textAlign: 'left' }}>WELCOME TO THE</ThemedText>
<ThemedText type="subtitle" style={{ color: 'yellow', textAlign: 'left' }}> 2024 CENSUS APP</ThemedText> 

        <ThemedText type="subtitle">Please follow the instructions to complete the census form.</ThemedText>
        <Image
    source={require('@/assets/images/675.jpg')}
    style={{ width: 280, height: 200, marginVertical: 10 }}
  />
       <TouchableOpacity
      style={styles.button}
      onPress={() => (navigation as any).navigate('forms')} 
    >
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color:'#ffff00',
    marginBottom: 10,
    
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  reactLogo: {
    height: 290,
    width: 385,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
