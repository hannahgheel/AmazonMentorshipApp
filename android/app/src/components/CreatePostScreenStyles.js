import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '../styles/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, alignItems: 'center' },
  imagePicker: { width: width - 48, height: width - 48, backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center', marginBottom: 24, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  imagePickerText: { color: colors.textSecondary, fontFamily: fonts.body, fontSize: 16 },
  imagePreview: { width: '100%', height: '100%', borderRadius: 20 },
  captionInput: { 
    width: width - 48,
    height: 100, 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 20, 
    padding: 16, 
    backgroundColor: colors.card, 
    marginBottom: 24, 
    color: colors.textPrimary, 
    fontFamily: fonts.body, 
    fontSize: 16, 
    textAlignVertical: 'top'
  },
});