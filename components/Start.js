import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import BackgroundImage from '../assets/Background-Image.png'
import Icon from '../assets/profileicon.png'

export default class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      backgroundColor: this.colors.blue };
  }

  changeBackgroundColor = (newColor) => {
    this.setState({ backgroundColor: newColor });
  }

  colors = {
    dark: '#090C08',
    purple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE'
  };

  render() {
    return (
      <View style={styles.container}>

        <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Chat</Text>
          </View>

          <View style={styles.form}>

            <View style={styles.inputContainer}>
              <Image source={Icon} style={styles.icon}/>
              <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({name: text})}
              value={this.state.name}
              placeholder='Enter your Name'
              />
            </View>
            
            <View style={styles.chooseContainer} >
              <Text style={styles.choose}>Choose Background Color: </Text>
            </View>

            <View style={styles.colorContainer}>
              <TouchableOpacity style={styles.color1} onPress={() => this.changeBackgroundColor(this.colors.dark)} />
              <TouchableOpacity style={styles.color2} onPress={() => this.changeBackgroundColor(this.colors.purple)} />
              <TouchableOpacity style={styles.color3} onPress={() => this.changeBackgroundColor(this.colors.blue)}/>
              <TouchableOpacity style={styles.color4} onPress={() => this.changeBackgroundColor(this.colors.green)}/>
            </View>

              <Pressable
                title="Go to Chat"
                onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Start Chatting</Text>
              </Pressable>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    height: '50%',
    width: '88%',
    alignItems: 'center',
    paddingTop: 100
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF'
  },

  form: {
    backgroundColor: 'white',
    height: '44%',
    width: '88%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  inputContainer: {
    borderWidth: 2,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:20,

  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10
  },

  input: {
    fontSize:16,
    fontWeight: "300", 
    color: '#757083', 
    opacity: 0.5,
  },

  chooseContainer: {
    width: '88%'
  },

  choose: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1
  },

  colorContainer: {
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  color1: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25

  },

  color2: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25

  },

  color3: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25

  },

  color4: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25

  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: "#757083",
    width: '88%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize:16,
    fontWeight: '600'
  }
});