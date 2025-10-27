import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BackgroundGradient from 'components/BackgroundGradient';

const FOOTER_HEIGHT = 72;

type LayoutProps = {
  children: React.ReactNode;
  Footer?: React.ComponentType<any>;
  footerProps?: Record<string, any>;
};

export default function Layout({ children, Footer, footerProps }: LayoutProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.root}>
        <BackgroundGradient />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: FOOTER_HEIGHT + bottom }]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {Footer ? (
          <View style={[styles.footerWrap, { paddingBottom: bottom }]}>
            <Footer {...footerProps} />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAD4C0' },
  root: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  footerWrap: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    borderTopWidth: 1, borderColor: '#ddd',
    backgroundColor: '#FFE1DB',
    minHeight: 72,
    justifyContent: 'center'
  }
});
