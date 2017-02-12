import React, { Component, PropTypes as RPT } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';

const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAACACAYAAADwKbyHAAAFPUlEQVR4Xu3dzW4URxAH8O7B2CfEhZMNxIiPvAEcWSeBXPMEfBgEdySUQy4+IUXKE/hgSN7CCZIdiUteIRI5xIh7btjGM2gXxthmszPVXVX9r1H56u2e2v/PNR89s+sY/AcigQhRhRcRHALkj8AhHAIkAZAyvCMcAiQBkDK8IxwCJAGQMrwjHAIkAZAyvCMcAiQBkDK8IxwCJAGQMrwjHAIkAZAyvCMcAiQBkDK8IxwCJAGQMrwjHAIkAZAyWDvizbd3roX3c4+XVi4+jWtrNch7ZC3j9XePzi683/95d+70j5dfrv/HNTkbxEeEuBVitViH8OuF0VerQ8OYIOztbYYq3gh189fu/Pz3XBgsEEcR2r+QoWEcQzh8k3wY2RDTEIaGMRWBGSMLYhbCUDBmIjBiJEP0QbCO0QuBCSMJgoJgFYOEwIBBhkhBsIaRhJCJQYLIQfh8vt28WBotP0A9tc1CyMDoDcGD0FaKicGCkIjRC4IXARODFSEBoxNCBgELQwSBiNENMbq/FUIYca2pfDlP2d2UKMKnN9uE8MuF7edPZ2XYCfHvrdXFar/ZDiFcHRqGBkKsw+Ze1fxwafvFuyyI8eAhYiAhjDPu7IhWUQUj1s+Xbl56KH1qi4ZAglDrDGEMRAQyhHUMVIQkCKsYyAjJENYw0BGyIMaDd765sxTrU+PrDLlT28xjhgWEbAh0DCsILBCoGJYQ2CDQMKwhsEKgYFhEYIcojWEVQQTiM0bcDqG6IrZQeOJsyjKCGIQ2xj+v3p45fAJPSL7vKmrq5nsv+qVs4ON1hnBnNOG30DRfTx6DFPqRRhDtiDYTFQwhgElAPe8n5JYg2hHWMbQQVDrCKoYmgiqE2gE8dx+huDs6WqrKrunoBtGPGdqd0GajDjHe8JvRw/Mh7G+JXmckdEYpBPVd09Fs0DBKIhSFQOqM0gjFIRAwEBAgIEpioCDAQJTAQEKAgtDEQEOAg5gsZe/v/R5ivJ5w9kkYUvbB52mFFrmOmFaIxv2EY9vNfDqEoN7rpRAQ6giHl7M6z9r2kSgOUQwBDKMoRHEEIIxiEDAIIBhFIOAQADDUIWARCmOoQsAjFMRQgzCDUAhDBcIcQgEMcQizCMoYohAaCHWoX1YhLIvedlVYDhGD0EBoV1FPh7lz4vfAhTFEIDQR2k/069wDl1u1ZYcogdDuzi1jsEKURLCOwQaBgGAZgwUCCcEqRjYEIkKLofN4J88BPAsCGcEaRjKEBQRNjNzvQk+CsIRgBYMMYRHBAgYJwjICOkZviCEgIGP0ghgSwnEM2a84ohzAOyGGiICI0Qmxc/PeZozxdp+n1VJeU/qBYJUv/2ris/N/bvw0K59uiJX7N+JBvRmq6mxK0DM3rvRh8q66JTHqJv4d5sPKxT823mZBjAfvCGCU7oSToUhg9EUY19LZEYf7U0YMNASJYwYFgQTB1RmoCJwYVAQyRC4GOkKLkfP12ykISRCpGFYQcjBSEZIhqBjWEFIwchCyIPpiWEWgYOQiZEN0YVhH6IPBgcAC8X8YQ0GYhcGFwAZxEmNoCNMwOBFYIVqMpg5PDmJzt+t/6sy63Ef+3eTUdrderxeqR13LFpT30fvKmjKpv5aegEPQMxMZ4RAisdIndQh6ZiIjHEIkVvqkDkHPTGSEQ4jESp/UIeiZiYxwCJFY6ZM6BD0zkREOIRIrfVKHoGcmMsIhRGKlT+oQ9MxERjiESKz0SR2CnpnICIcQiZU+qUPQMxMZ4RAisdIndQh6ZiIjHEIkVvqkDkHPTGSEQ4jESp/0A1uaLMwkMVHUAAAAAElFTkSuQmCC';

export default class DeleteButton extends Component {

  static propTypes = {
    iconStyle: RPT.any,
    phrase: RPT.object,
    style: RPT.any
  }

  @autobind
  handleClick() {
    const { phrase } = this.props;

    Alert.alert('Are you sure?', '',
      [
        { text: 'OK', onPress: () => phrase.destroy() },
        { text: 'Cancel' }
      ]
    );
  }

  render() {
    const { style, iconStyle } = this.props;

    return (
      <TouchableOpacity style={[styles.base, !!style && style]} onPress={this.handleClick}>
        <Image style={[styles.icon, !!iconStyle && iconStyle]} source={{ uri: base64Icon, scale: 1 }} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 60,
    height: 80,
    borderLeftColor: '#DEDEDE',
    borderLeftWidth: StyleSheet.hairlineWidth
  },

  icon: {
    height: 28,
    resizeMode: 'contain',
    position: 'relative',
    top: 16
  }
});
