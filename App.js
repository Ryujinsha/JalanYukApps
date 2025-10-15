import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
  SafeAreaView, TextInput, StatusBar, ScrollView, Alert
} from 'react-native';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🌟 Gimmick login

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/201/201623.png' }}
          style={styles.loginLogo}
        />
        <Text style={styles.loginTitle}>Jalan Yuk 🌴</Text>
        <Text style={styles.loginSubtitle}>Temukan petualangan terbaikmu hari ini!</Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => setIsLoggedIn(true)}>
          <Text style={styles.loginButtonText}>Masuk Sekarang</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 🏝️ Daftar destinasi
  const destinations = [
    {
      id: '1',
      title: 'Bali Paradise',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      desc: 'Nikmati keindahan pantai dan budaya Bali yang mempesona.',
      price: 'Rp 2.500.000',
    },
    {
      id: '2',
      title: 'Gunung Bromo',
      image: 'https://images.unsplash.com/photo-1604335399106-5df5d4f9c2e8',
      desc: 'Petualangan seru di Gunung Bromo dengan sunrise yang menakjubkan.',
      price: 'Rp 1.800.000',
    },
  ];

  // ✈️ Daftar penerbangan
  const flightRoutes = [
    {
      id: '1',
      route: 'Jakarta ✈ Bali',
      airline: 'Garuda Indonesia',
      price: 'Rp 950.000',
      time: '08:30 - 10:10',
      image: 'https://upload.wikimedia.org/wikipedia/id/thumb/3/3c/Garuda_Indonesia_logo.svg/2560px-Garuda_Indonesia_logo.svg.png',
      desc: 'Penerbangan langsung dengan kenyamanan premium.',
    },
    {
      id: '2',
      route: 'Surabaya ✈ Lombok',
      airline: 'Citilink',
      price: 'Rp 610.000',
      time: '13:15 - 14:40',
      image: 'https://upload.wikimedia.org/wikipedia/id/f/f2/Citilink_logo.svg',
      desc: 'Penerbangan cepat dengan layanan ramah.',
    },
    {
      id: '3',
      route: 'Bandung ✈ Medan',
      airline: 'Lion Air',
      price: 'Rp 820.000',
      time: '10:00 - 12:15',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Lion-air.svg/1200px-Lion-air.svg.png',
      desc: 'Harga terjangkau untuk perjalanan antarpulau.',
    },
  ];

  // 🏨 Daftar hotel
  const hotels = [
    {
      id: '1',
      name: 'Hotel Nirwana Bali',
      location: 'Kuta, Bali',
      price: 'Rp 850.000/malam',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      desc: 'Hotel tepi pantai dengan pemandangan indah dan fasilitas mewah.',
    },
    {
      id: '2',
      name: 'Bromo Hills Resort',
      location: 'Probolinggo, Jawa Timur',
      price: 'Rp 650.000/malam',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      desc: 'Resort dengan panorama pegunungan dan udara segar.',
    },
    {
      id: '3',
      name: 'The Grand Palace',
      location: 'Medan, Sumatera Utara',
      price: 'Rp 750.000/malam',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb',
      desc: 'Kemewahan di pusat kota dengan akses mudah.',
    },
  ];

  // 🎁 Promosi
  const promos = [
    {
      id: '1',
      title: 'Diskon 20% Tiket ke Bali!',
      desc: 'Nikmati promo eksklusif untuk penerbangan Garuda Indonesia ke Bali bulan ini!',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      id: '2',
      title: 'Gratis Sarapan di Bromo Hills Resort',
      desc: 'Pesan sekarang dan nikmati sarapan gratis selama 2 hari pertama.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    },
  ];

  // --- Filtering ---
  const filteredDestinations = destinations.filter(d =>
    d.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredFlights = flightRoutes.filter(f =>
    f.route.toLowerCase().includes(searchText.toLowerCase()) ||
    f.airline.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(searchText.toLowerCase()) ||
    h.location.toLowerCase().includes(searchText.toLowerCase())
  );

  // 🔍 Search Bar
  const renderSearchBar = () => (
    <View style={styles.searchBarContainer}>
      <TextInput
        placeholder="Cari destinasi, rute, atau hotel..."
        placeholderTextColor="#888"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );

  // --- DETAIL PAGES (Tidak berubah) ---
  const renderDestinationDetail = () => (
    <ScrollView style={styles.detailContainer}>
      <TouchableOpacity onPress={() => setSelectedDestination(null)} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Kembali</Text>
      </TouchableOpacity>
      <Image source={{ uri: selectedDestination.image }} style={styles.detailImage} />
      <Text style={styles.detailTitle}>{selectedDestination.title}</Text>
      <Text style={styles.detailDesc}>{selectedDestination.desc}</Text>
      <View style={styles.priceBox}>
        <Text style={styles.priceText}>Harga: {selectedDestination.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={() => Alert.alert('Booking Berhasil', `Anda memesan ${selectedDestination.title}`)}>
        <Text style={styles.bookingButtonText}>Booking Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderFlightDetail = () => (
    <ScrollView style={styles.detailContainer}>
      <TouchableOpacity onPress={() => setSelectedFlight(null)} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Kembali</Text>
      </TouchableOpacity>
      <Image source={{ uri: selectedFlight.image }} style={styles.detailImage} resizeMode='contain' />
      <Text style={styles.detailTitle}>{selectedFlight.route}</Text>
      <Text style={styles.detailDesc}>Maskapai: {selectedFlight.airline}</Text>
      <Text style={styles.detailDesc}>Waktu: {selectedFlight.time}</Text>
      <Text style={styles.detailDesc}>{selectedFlight.desc}</Text>
      <View style={styles.priceBox}>
        <Text style={styles.priceText}>Harga: {selectedFlight.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={() => Alert.alert('Booking Berhasil', `Anda memesan ${selectedFlight.route}`)}>
        <Text style={styles.bookingButtonText}>Booking Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderHotelDetail = () => (
    <ScrollView style={styles.detailContainer}>
      <TouchableOpacity onPress={() => setSelectedHotel(null)} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Kembali</Text>
      </TouchableOpacity>
      <Image source={{ uri: selectedHotel.image }} style={styles.detailImage} />
      <Text style={styles.detailTitle}>{selectedHotel.name}</Text>
      <Text style={styles.detailDesc}>{selectedHotel.location}</Text>
      <Text style={styles.detailDesc}>{selectedHotel.desc}</Text>
      <View style={styles.priceBox}>
        <Text style={styles.priceText}>Harga: {selectedHotel.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookingButton}
        onPress={() => Alert.alert('Reservasi Berhasil', `Anda memesan ${selectedHotel.name}`)}>
        <Text style={styles.bookingButtonText}>Reservasi Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // --- MAIN PAGES (Perubahan dan Penambahan) ---

  // ✈️ Halaman Penerbangan
  const renderFlightsPage = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      {renderSearchBar()}
      <Text style={styles.sectionTitle}>✈️ Semua Rute Penerbangan</Text>
      {filteredFlights.map((f) => (
        <TouchableOpacity key={f.id} style={styles.cardSmall} onPress={() => setSelectedFlight(f)}>
          <Text style={styles.cardTitle}>{f.route}</Text>
          <Text style={styles.cardDesc}>{f.airline}</Text>
          <Text style={styles.cardPrice}>{f.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // 🏨 Halaman Reservasi (Hotel)
  const renderHotelsPage = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      {renderSearchBar()}
      <Text style={styles.sectionTitle}>🏨 Pilihan Hotel Terbaik</Text>
      {filteredHotels.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card} onPress={() => setSelectedHotel(item)}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDesc}>{item.location}</Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  // 🎁 Halaman Promosi
  const renderPromosi = () => (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.sectionTitle}>🎁 Promo Spesial Untukmu</Text>
      {promos.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  // 👤 Halaman Profil (Diperbarui)
  const renderProfile = () => (
    <View style={styles.centeredPage}>
      <View style={{ alignItems: 'center', width: '100%', marginBottom: 20 }}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 15 }}
        />
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>John Doe</Text>
        <Text style={{ color: '#555', fontSize: 16 }}>Travel Enthusiast</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileInfoLabel}>Email:</Text>
        <Text style={styles.profileInfoText}>john.doe@example.com</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileInfoLabel}>Telepon:</Text>
        <Text style={styles.profileInfoText}>+62 812 3456 7890</Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileInfoLabel}>Lokasi:</Text>
        <Text style={styles.profileInfoText}>Jakarta, Indonesia</Text>
      </View>
      <Text style={{ color: '#555', marginVertical: 20, textAlign: 'center', fontStyle: 'italic' }}>
        "Seorang traveler yang suka menjelajahi alam dan budaya lokal. Tujuan berikutnya? Kamu yang tentukan!"
      </Text>
    </View>
  );

  // ⚙️ Halaman Pengaturan (Diperbarui)
  const renderSetting = () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Pengaturan</Text>
      {['Notifikasi', 'Bahasa', 'Tema', 'Tentang Aplikasi'].map((item, i) => (
        <TouchableOpacity key={i} style={styles.settingListItem}>
          <Text style={{ fontSize: 16, color: '#333' }}>{item}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.settingButton, { backgroundColor: '#ff5252', alignSelf: 'center', marginTop: 30 }]}
        onPress={() => {
          setIsLoggedIn(false);
          setActiveTab('Home');
        }}>
        <Text style={styles.settingButtonText}>🚪 Keluar</Text>
      </TouchableOpacity>
    </View>
  );


  // --- Render Konten Utama (Logika Diperbarui) ---
  const renderContent = () => {
    // Prioritas utama untuk halaman detail
    if (selectedDestination) return renderDestinationDetail();
    if (selectedFlight) return renderFlightDetail();
    if (selectedHotel) return renderHotelDetail();

    // Logika berdasarkan tab yang aktif
    switch (activeTab) {
      case 'Penerbangan':
        return renderFlightsPage();
      case 'Reservasi':
        return renderHotelsPage();
      case 'Promosi':
        return renderPromosi();
      case 'Profile':
        return renderProfile();
      case 'Setting':
        return renderSetting();
      case 'Home':
      default:
        return ( // Halaman Home sekarang jadi dashboard
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {renderSearchBar()}

            <Text style={styles.sectionTitle}>🌍 Destinasi Populer</Text>
            {filteredDestinations.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card} onPress={() => setSelectedDestination(item)}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>✈️ Penerbangan Tersedia</Text>
            {/* Hanya menampilkan 2 penerbangan pertama sebagai cuplikan */}
            {filteredFlights.slice(0, 2).map((f) => (
              <TouchableOpacity key={f.id} style={styles.cardSmall} onPress={() => setSelectedFlight(f)}>
                <Text style={styles.cardTitle}>{f.route}</Text>
                <Text style={styles.cardDesc}>{f.airline}</Text>
                <Text style={styles.cardPrice}>{f.price}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>🏨 Hotel Pilihan</Text>
            {/* Hanya menampilkan 1 hotel pertama sebagai cuplikan */}
            {filteredHotels.slice(0, 1).map((item) => (
              <TouchableOpacity key={item.id} style={styles.card} onPress={() => setSelectedHotel(item)}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc}>{item.location}</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>🎁 Promo Spesial</Text>
            {/* Hanya menampilkan 1 promo pertama sebagai cuplikan */}
            {promos.slice(0, 1).map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        );
    }
  };

  const bottomTabs = [
    { key: 'Home', icon: require('./assets/home.png') },
    { key: 'Penerbangan', icon: require('./assets/ticket.png') },
    { key: 'Reservasi', icon: require('./assets/reservasi.png') },
    { key: 'Promosi', icon: require('./assets/promo.png') },
    { key: 'Profile', icon: require('./assets/profile.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00bcd4" />
      {/* Header hanya muncul jika tidak di halaman detail */}
      {!selectedDestination && !selectedFlight && !selectedHotel && (
        <View style={styles.header}>
          <Text style={styles.headerText}>{activeTab === 'Home' ? 'Jalan Yuk 🌴' : activeTab}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setActiveTab('Setting')}>
              <Image source={require('./assets/setting.png')} style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.content}>{renderContent()}</View>
      {/* Bottom Nav hanya muncul jika tidak di halaman detail */}
      {!selectedDestination && !selectedFlight && !selectedHotel && (
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            {bottomTabs.map((tab) => (
              <TouchableOpacity key={tab.key} onPress={() => setActiveTab(tab.key)} style={styles.navButton}>
                <Image
                  source={tab.icon}
                  style={[styles.navIconImage, activeTab === tab.key && styles.activeIconImage]}
                />
                <Text style={[styles.navText, activeTab === tab.key && styles.activeText]}>{tab.key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },

  // 🌟 LOGIN PAGE
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f7fa' },
  loginLogo: { width: 120, height: 120, marginBottom: 20 },
  loginTitle: { fontSize: 28, fontWeight: 'bold', color: '#00bcd4' },
  loginSubtitle: { fontSize: 16, color: '#555', marginVertical: 10 },
  loginButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3
  },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Header
  header: {
    backgroundColor: '#00bcd4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerRight: { flexDirection: 'row' },
  headerIcon: { width: 26, height: 26, marginLeft: 15, tintColor: '#fff' },

  content: { flex: 1, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#00796b', marginVertical: 15, marginLeft: 5 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 15,
    elevation: 4,
    overflow: 'hidden',
  },
  cardSmall: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    elevation: 2,
  },
  cardImage: { width: '100%', height: 150 },
  cardTextContainer: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDesc: { fontSize: 14, color: '#666', marginTop: 5 },
  cardPrice: { fontSize: 16, color: '#00bcd4', marginTop: 8, fontWeight: 'bold' },
  detailContainer: { flex: 1, backgroundColor: '#fff' },
  backButton: { padding: 15, backgroundColor: '#00bcd4' },
  backButtonText: { color: '#fff', fontSize: 16 },
  detailImage: { width: '100%', height: 250 },
  detailTitle: { fontSize: 24, fontWeight: 'bold', color: '#00bcd4', margin: 15 },
  detailDesc: { fontSize: 16, color: '#444', marginHorizontal: 15, marginBottom: 5 },
  priceBox: { backgroundColor: '#e0f7fa', padding: 15, borderRadius: 10, margin: 15 },
  priceText: { fontSize: 18, fontWeight: 'bold', color: '#00bcd4' },
  bookingButton: {
    backgroundColor: '#00bcd4',
    marginHorizontal: 15,
    marginBottom: 25,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
  },
  bookingButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Bottom nav
  bottomNavContainer: { position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navButton: { alignItems: 'center', flex: 1 },
  navIconImage: { width: 26, height: 26, tintColor: '#888', marginBottom: 3 },
  activeIconImage: { tintColor: '#00bcd4', transform: [{ scale: 1.1 }] },
  navText: { fontSize: 12, color: '#888', fontWeight: '500' },
  activeText: { color: '#00bcd4', fontWeight: 'bold' },

  // 🔍 Search
  searchBarContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333', paddingVertical: 10 },

  // ⚙️ Setting list (Diperbarui)
  settingListItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 1,
  },

  // Profile (Diperbarui)
  centeredPage: {
    flex: 1,
    padding: 20,
  },
  profileInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 1,
  },
  profileInfoLabel: {
    fontSize: 14,
    color: '#888',
  },
  profileInfoText: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  settingButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 8,
    elevation: 2,
  },
  settingButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});