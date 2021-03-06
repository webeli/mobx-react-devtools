import React, { Component, PropTypes } from 'react';
import { eventEmitter } from '../globalStore';
import GraphControl from '../Controls/GraphControl';
import LogControl from '../Controls/LogControl';
import UpdatesControl from '../Controls/UpdatesControl';
import PanelButton from './PanelButton';
import * as styles from './styles';

export default class Panel extends Component {

  static propTypes = {
    highlightTimeout: PropTypes.number,
  };

  componentDidMount() {
    eventEmitter.on('update', this.handleUpdate);
  }

  componentWillUnmount() {
    eventEmitter.removeListener('update', this.handleUpdate)
  }

  handleUpdate = () => this.setState({});

  render() {
    const { position, highlightTimeout } = this.props;

    const additionalPanelStyles = {};
    if (position) {
      additionalPanelStyles.top = position.top;
      additionalPanelStyles.right = position.right;
      additionalPanelStyles.bottom = position.bottom;
      additionalPanelStyles.left = position.left;
    } else {
      additionalPanelStyles.top = '0px';
      additionalPanelStyles.right = '20px';
    }

    return (
      <div>
        <div style={Object.assign({}, styles.panel, additionalPanelStyles)}>
          <UpdatesControl highlightTimeout={highlightTimeout}>
            <PanelButton id={'buttonUpdates'} />
          </UpdatesControl>
          <GraphControl>
            <PanelButton id ={'buttonGraph' } />
          </GraphControl>
          <LogControl>
            <PanelButton id={'buttonLog'} />
          </LogControl>
        </div>
      </div>
    );
  }
};
