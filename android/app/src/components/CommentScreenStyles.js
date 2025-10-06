import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  commentItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    fontSize: 20,
    marginBottom: 2,
  },
  commentText: {
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    color: colors.textPrimary,
    fontFamily: fonts.body,
    fontSize: 14,
    backgroundColor: colors.background,
  },
  postButton: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: fonts.heading,
    fontSize: 14,
  },
});
