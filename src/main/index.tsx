import React, {Component} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

import styles from './styles';

class Main extends Component {
  renderCard = () => {
    return (
      <Card>
        <Card.Title
          title="This is an example"
          subtitle="I hope this is useful"
          left={props => <Avatar.Icon {...props} icon="folder" />}
        />
        <Card.Content>
          <Title>Nicer title</Title>
          <Paragraph>I like trains</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Actions>
          <Button>Take Snapshot</Button>
        </Card.Actions>
      </Card>
    );
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.scrollView}>
          {this.renderCard()}
        </SafeAreaView>
      </>
    );
  }
}

export default Main;
