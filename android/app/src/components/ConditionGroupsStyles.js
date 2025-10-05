import { StyleSheet } from 'react-native';
import { colors, fonts } from "../styles/theme";

export default StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.titles,
    marginBottom: 14,
    fontFamily: fonts.heading,
    textAlign: "center",
  },
  group: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.border,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent,
    fontFamily: fonts.heading,
    marginBottom: 4,
  },
  specialist: {
    fontSize: 15,
    color: colors.titles,
    fontFamily: fonts.body,
    marginBottom: 8,
  },
});