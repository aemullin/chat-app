import React from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble} from 'react-native-gifted-chat';
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuB4f2Yqp6--9tdaKN1fyLDdVEYWqzPyo",
  authDomain: "chat-c3a87.firebaseapp.com",
  projectId: "chat-c3a87",
  storageBucket: "chat-c3a87.appspot.com",
  messagingSenderId: "380578481498",
  appId: "1:380578481498:web:3bea1cb969b3147b57df63",
  measurementId: "G-FP3LF9VZXD"
};



export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    };
    
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name })

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  };

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {

      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
      });
    });
    this.setState({
      messages: messages
    })
  }
  
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();

  }

  addMessage() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user
    });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessage();
    })
  }

  renderBubble(props) {
    return (
      <Bubble 
        {...props}
        wrapperStyle ={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    const {backgroundColor} = this.props.route.params;

    return (
      <View style={{
        flex: 1,
        backgroundColor: backgroundColor}}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.state.user._id,
              name: this.state.name,
              avatar: this.state.user.avatar,
            }}
          />
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}
