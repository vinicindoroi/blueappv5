import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Linking, Alert, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  CircleHelp as HelpCircle, 
  X, 
  Mail, 
  Video, 
  MessageCircle,
  ChevronRight,
  Headphones,
  CircleAlert,
  RefreshCw
} from 'lucide-react-native';
import { theme } from '@/constants/theme';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing
} from 'react-native-reanimated';

export const HelpBalloon = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.9);
  const pulseScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(10);

  // Entry animation when component mounts
  useEffect(() => {
    // Initial entrance animation
    scale.value = withDelay(1000, withSpring(1, { damping: 15, stiffness: 150 }));
    opacity.value = withDelay(1000, withTiming(1, { duration: 300 }));
    
    // Text animation with slight delay after balloon
    textOpacity.value = withDelay(1200, withTiming(1, { duration: 400 }));
    textTranslateY.value = withDelay(1200, withSpring(0, { damping: 12, stiffness: 120 }));
    
    // Subtle pulse animation every 10 seconds
    const startPulse = () => {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) })
        ),
        -1, // Infinite
        false
      );
    };

    const pulseTimer = setInterval(startPulse, 10000); // Every 10 seconds
    
    return () => clearInterval(pulseTimer);
  }, []);

  const balloonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { scale: pulseScale.value }
    ],
    opacity: opacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));
  const handleBalloonPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleEmailSupport = async () => {
    const email = 'support@magicbluedrops.com';
    const subject = 'BlueApp Support Request';
    const body = 'Hello BlueApp Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you!';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
        setIsModalVisible(false);
      } else {
        Alert.alert(
          'Email Support',
          `Please send an email to: ${email}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Email Support',
        `Please send an email to: ${email}`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleAppTutorial = () => {
    setIsModalVisible(false);
    router.push('/(tabs)/help'); // Navigate to "How to Use BlueApp"
  };

  const handleHelpCenter = () => {
    setIsModalVisible(false);
    router.push('/(tabs)/help-center');
  };

  const handleProductIssues = async () => {
    const email = 'support@magicbluedrops.com';
    const subject = 'BlueDrops Product Issue Report';
    const body = 'Hello BlueApp Support Team,\n\nI am experiencing an issue with my BlueDrops product:\n\n[Please describe the issue in detail]\n\nProduct details:\n- Order date: [Please specify]\n- Tracking number: [If available]\n- Issue type: [Please describe]\n\nThank you for your assistance!';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
        setIsModalVisible(false);
      } else {
        Alert.alert(
          'Product Support',
          `Please send an email to: ${email}\n\nSubject: ${subject}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Product Support',
        `Please send an email to: ${email}\n\nSubject: ${subject}`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleReturnsExchanges = async () => {
    const email = 'support@magicbluedrops.com';
    const subject = 'BlueDrops Return/Exchange Request';
    const body = 'Hello BlueApp Support Team,\n\nI would like to request a return/exchange for my BlueDrops order:\n\n[Please select one]\n☐ Return - Full refund\n☐ Exchange - Different product\n☐ Exchange - Damaged product\n\nOrder details:\n- Order date: [Please specify]\n- Tracking number: [If available]\n- Reason: [Please explain]\n\nThank you!';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
        setIsModalVisible(false);
      } else {
        Alert.alert(
          'Returns & Exchanges',
          `Please send an email to: ${email}\n\nSubject: ${subject}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Returns & Exchanges',
        `Please send an email to: ${email}\n\nSubject: ${subject}`,
        [{ text: 'OK' }]
      );
    }
  };
  return (
    <>
      {/* Floating Help Balloon */}
      <Animated.View style={[styles.balloonContainer, { bottom: insets.bottom + 140 }, balloonAnimatedStyle]}>
        {/* Help Text Above Balloon */}
        <Animated.View style={[styles.helpTextContainer, textAnimatedStyle]}>
          <Text style={styles.helpText}>Need Help?</Text>
        </Animated.View>
        
        <TouchableOpacity
          style={styles.balloon}
          onPress={handleBalloonPress}
          activeOpacity={0.8}
        >
          <HelpCircle size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </Animated.View>

      {/* Help Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <View style={styles.headerIcon}>
                  <Headphones size={20} color={theme.colors.primary[600]} />
                </View>
                <Text style={styles.modalTitle}>Need Help?</Text>
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <X size={20} color={theme.colors.gray[500]} />
              </TouchableOpacity>
            </View>

            {/* Product Support */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product Support</Text>
              
              <TouchableOpacity style={styles.productCard} onPress={handleProductIssues}>
                <View style={styles.productIcon}>
                  <CircleAlert size={20} color={theme.colors.error[600]} />
                </View>
                <View style={styles.productContent}>
                  <Text style={styles.productTitle}>Product Issues</Text>
                  <Text style={styles.productDescription}>Report problems with your BlueDrops</Text>
                </View>
                <ChevronRight size={16} color={theme.colors.gray[400]} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.exchangeCard} onPress={handleReturnsExchanges}>
                <View style={styles.exchangeIcon}>
                  <RefreshCw size={20} color={theme.colors.warning[600]} />
                </View>
                <View style={styles.exchangeContent}>
                  <Text style={styles.exchangeTitle}>Returns & Exchanges</Text>
                  <Text style={styles.exchangeDescription}>Request returns or product exchanges</Text>
                </View>
                <ChevronRight size={16} color={theme.colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              {/* Quick Actions - Only App Tutorial */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                
                <TouchableOpacity style={styles.actionCard} onPress={handleAppTutorial}>
                  <View style={styles.actionIcon}>
                    <Video size={20} color={theme.colors.primary[600]} />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>App Tutorial</Text>
                    <Text style={styles.actionDescription}>Learn how to use BlueApp</Text>
                  </View>
                  <ChevronRight size={16} color={theme.colors.gray[400]} />
                </TouchableOpacity>
              </View>

              {/* Contact Support */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Support</Text>
                
                <TouchableOpacity style={styles.contactCard} onPress={handleEmailSupport}>
                  <View style={styles.contactIcon}>
                    <Mail size={20} color={theme.colors.primary[600]} />
                  </View>
                  <View style={styles.contactContent}>
                    <Text style={styles.contactTitle}>Email Support</Text>
                    <Text style={styles.contactEmail}>support@magicbluedrops.com</Text>
                    <Text style={styles.contactSubtext}>Response within 24 hours</Text>
                  </View>
                  <ChevronRight size={16} color={theme.colors.gray[400]} />
                </TouchableOpacity>
              </View>

              {/* More Help */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>More Help</Text>
                
                <TouchableOpacity style={styles.helpCard} onPress={handleHelpCenter}>
                  <View style={styles.helpIcon}>
                    <MessageCircle size={20} color={theme.colors.secondary[600]} />
                  </View>
                  <View style={styles.helpContent}>
                    <Text style={styles.helpTitle}>Help Center</Text>
                    <Text style={styles.helpDescription}>FAQ and detailed support</Text>
                  </View>
                  <ChevronRight size={16} color={theme.colors.gray[400]} />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  We're here to help you get the most out of BlueApp!
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  balloonContainer: {
    position: 'absolute',
    right: 16,
    zIndex: 1000,
    alignItems: 'center',
  },
  helpTextContainer: {
    backgroundColor: theme.colors.gray[800],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  helpText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.white,
    textAlign: 'center',
  },
  balloon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.gray[900],
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[700],
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Action Card Styles
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.gray[900],
    marginBottom: 2,
  },
  actionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[600],
  },
  
  // Contact Card Styles
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary[50],
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.primary[100],
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.primary[800],
    marginBottom: 2,
  },
  contactEmail: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.primary[700],
    marginBottom: 2,
  },
  contactSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: theme.colors.primary[600],
  },
  
  // Help Card Styles
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary[50],
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.secondary[100],
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.secondary[800],
    marginBottom: 2,
  },
  helpDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.secondary[600],
  },
  
  // Product Card Styles
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.error[50],
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.error[100],
    marginBottom: 12,
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.error[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  productContent: {
    flex: 1,
  },
  productTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.error[800],
    marginBottom: 2,
  },
  productDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.error[600],
  },
  
  // Exchange Card Styles
  exchangeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.warning[50],
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.warning[100],
  },
  exchangeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.warning[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exchangeContent: {
    flex: 1,
  },
  exchangeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.warning[800],
    marginBottom: 2,
  },
  exchangeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.warning[600],
  },
  
  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
    marginTop: 8,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.gray[500],
    textAlign: 'center',
    lineHeight: 16,
  },
});