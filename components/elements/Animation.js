import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import Animation from 'lottie-react-native';

export class Anim extends Component {
	render(){
    const {
      style,
      ref,
      backdropPressToClose,
      backdropOpacity,
      onOpened,
      swipeToClose,
      animRef,
      animStyle,
      animLoop,
      animSource
    } = this.props;
    return(
      <Modal
        style={style}
        ref={ref}
        backdropPressToClose={backdropPressToClose}
        backdropOpacity={backdropOpacity}
        swipeToClose={swipeToClose}
        onOpened={onOpened}
      >
        <Animation
          ref={animRef}
          style={animStyle}
          loop={animLoop}
          source={animSource}
        />
      </Modal>
    )
  }
}