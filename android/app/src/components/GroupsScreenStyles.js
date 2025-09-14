import { StyleSheet } from 'react-native';
import { colors, fonts } from '../styles/theme';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    padding: 16 
  },
  header: { 
    fontSize: 24, 
    fontFamily: fonts.heading, 
    color: colors.textPrimary, 
    marginBottom: 12, 
    fontWeight: 'bold',
    textAlign: 'left'
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  groupName: {
    flex: 1,
    fontSize: 17,
    color: colors.textPrimary,
    fontFamily: fonts.body,
  },
  joinButton: {
    backgroundColor: colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  joinButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontFamily: fonts.heading,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontFamily: fonts.body,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});