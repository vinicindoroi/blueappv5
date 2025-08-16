import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Wrench } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function SupportScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.colors.gray[700]} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Product Support</Text>
        
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Wrench size={48} color={theme.colors.warning[600]} />
        </View>
        
        <Text style={styles.title}>Product Support</Text>
        <Text style={styles.subtitle}>
          This page is under construction. We're building a comprehensive support system for BlueDrops products.
        </Text>
        
        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    backgroundColor: theme.colors.white,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.warning[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: theme.colors.warning[200],
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.gray[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  comingSoonBadge: {
    backgroundColor: theme.colors.warning[600],
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  comingSoonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.white,
  },
});