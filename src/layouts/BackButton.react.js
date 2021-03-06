import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEz0lEQVR4Xu2d11bcQBBEL9/pnG0w4JxzzgZsMM45fZL9Lw6n8e4h7S6SGp8JXXrZF02qul3SJs0YOkIrMBZ69Vo8AiA4BAJAAARXIPjylQACILgCwZevBBAAwRUIvnwlgAAIrkDw5SsBBEBwBYIvXwkgAIIrEHz5SgABEFyB4MtXAgiA4AoEX74SQAAEVyD48pUAAiC4AsGXrwQQAMEV8C1/DvgJPPV1k661EqC79k+Aw73m9jrfvat0LQVAN+2t8ifXNC0SAgHQHoBB5vd7mQAW2neZroUAaKf9LDC1QZOiIBAAzQFoYr719qd3b1BEEgiAZgDMANPNTl06yyCwJHjWok2SUwXAxrK3Nb/fYxEQCIDRADwGjmzMyNAz7DJgSZDtIQCGW+M1fxEY710OBEC2Cgye2CPgqGPORZhv61MCrHfZa/5z4FDuld9ftgBYDcBD4Jij8l8AB0sxXwkQ3HwBsAzAA+C4o/JfAgdKqnxdAmT+kgLR7wHuAyciVr4SALzmvwL2lxj7K4GPmgD3gJOOyn8N7Cvd/KiXAJm/gvxoCXAXOOWo/DfA3hoqP+I9gNf8tz3zfzsAyq5plAS4A5x2qF+l+VHuAWT+CPJrT4DbwBlH5b8D9gBVxX6Ut4Fe898Du2s2v+ZLwC3grKPyQ5hfKwBe8z8Au2qv/FrfBt4EzjkqP5T5tSWA1/yPwM4olV9bAtwAzjsqP6T5tSSA1/xPwI5olV9LAlwHLjgqP7T5pSeA1/zPwPaolV96AlwDLjoq38y32P/l6KOKpiV+FOw1/0uv8sObX+Il4CpwyVF6X4FtqvxlBUtKAJnvIH9Y01IAuAJcdqxflT9EvBIA8Jr/Ddiq2B9MQAQAvgNbBEC5ANjMlQKO69+opiUkQH/+ugn8DxCUBIAtXxBsMgSlAWDL1wdBmwhBiQAIAgGwpMBmfBkU/vuAUhOgXwOCwJkGpQNgy/f+ICT018I1ACAIHClQCwAmgfdHoSF/HVQTAIKgQxLUBoBJ4P1jSKhfCNcIgCBokQS1AmASeP8cGuJfQjUDIAgaJEHtAJgE3gdEVP1P4QgACIIRSRAFAJPA+5CoKp8WEgkAQTAgCaIBYBJ4HxRZ1RPDIgIgCFYkQVQATALvw6KrSILIAGwWBPYYOdsjsMgjOgBmmne3kKKfHywA/tVtWAgEwHJwe3cMK3IPAQGw+sodDgIBsP7WzbtxZFFbyQiAwffuYSAQAMPfvHk3jy5iL0EBMPrduxcC20fYtpLN9hAAG1vTFQL7cMh2E7UkyPYQAM2smQGmm526dJaZb5Vvm0lnfQiA5vY0hcDMt+3jLf6zPwRAO4tmgakRTcz8cWCxXbfpzhYA7bUfBoGZPwE8a99luhYCoJv2c8DkmqZm/kK37tK1EgDdtV8JQZHm29IFQHcArKVB8AOY93WTrrUASKd9FiMLgCxsSDcJAZBO+yxGFgBZ2JBuEgIgnfZZjCwAsrAh3SQEQDrtsxhZAGRhQ7pJCIB02mcxsgDIwoZ0kxAA6bTPYmQBkIUN6SYhANJpn8XIAiALG9JNQgCk0z6LkQVAFjakm4QASKd9FiMLgCxsSDcJAZBO+yxGFgBZ2JBuEgIgnfZZjCwAsrAh3SQEQDrtsxhZAGRhQ7pJ/AVBQeaBOL30BwAAAABJRU5ErkJggg==';

export default () =>
  <TouchableOpacity style={styles.base} onPress={Actions.list}>
    <Image style={styles.image} source={{ uri: base64Icon, scale: 1 }} />
  </TouchableOpacity>;

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    left: 0,
    top: 30,
    width: 60,
    height: 80
  },

  image: {
    height: 28,
    resizeMode: 'contain',
    position: 'relative',
    top: 6
  }
});
