import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { firebaseAuth } from 'firebaseconfig';
import { getdb } from 'components/BackendEssentials';
import { Picker } from '@react-native-picker/picker';
import BackgroundGradient from 'components/BackgroundGradient';
import BackOnlyFooter from 'components/BackOnlyFooter';
import { getAllUserSymptomData } from 'components/BackendEssentials';
import CustomPicker from 'components/CustomPicker';
import { Circle } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

export default function MySymptomsScreen() {

  // States for each of the symptoms
  const [symptomMap, setSymptomMap] = useState({});
  const [msSymptomMap, setMsSymptomMap] = useState({});
  const [hormonalSymptomMap, setHormonalSymptomMap] = useState({});

  // States for the selected symptom from the dropdown menu
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [selectedMsSymptom, setSelectedMsSymptom] = useState('');
  const [selectedHormonalSymptom, setSelectedHormonalSymptom] = useState('');

  // bleeding-amount maps (used only for dot colours)
  const [bleedingAmountMap, setBleedingAmountMap] = useState({});
  const [hormonalBleedingAmountMap, setHormonalBleedingAmountMap] = useState({});

  // State for when the data is loading
  const [loading, setLoading] = useState(true);

  // State for the user gender
  const [gender, setGender] = useState(null);
  const [cycleType, setCycleType] = useState(null);

  const [dates, setDates] = useState([]);

  // Fetches the user data
  // Gets the current dates
  const [viewRangeMs, setViewRangeMs] = useState('first');
  const [viewRangeCycle, setViewRangeCycle] = useState('first');

  
  useEffect(() => {
    const fetchData = async (user) => {
      const today = new Date();
  
      const actualDates = [];
      const tempSymptoms = {};
      const tempMsSymptoms = {};
      const tempHormonalSymptoms = {};
      const tempBleedingAmounts = {};
      const tempHormonalBleedingAmounts = {};
      let genderFound = null;
      let cycleTypeFound = null;
  
      for (let i = 60; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const isoDate = date.toISOString().split("T")[0];
  
        const data = await getdb(user, isoDate);
        if (data) {
          actualDates.push(isoDate);
  
          if (!genderFound && data.sex) {
            genderFound = data.sex;
          }
  
          if (!cycleTypeFound && data.sex === "Female" && data.cycleType) {
            cycleTypeFound = data.cycleType;
          }

          // Populate symptom maps
          for (const key in data) {
            if (key.startsWith("menstrual") && key.endsWith("Severity")) {
              if (!tempSymptoms[key]) tempSymptoms[key] = {};
              tempSymptoms[key][isoDate] = data[key];
            }
  
            if (key.startsWith("ms")) {
              if (!tempMsSymptoms[key]) tempMsSymptoms[key] = {};
              tempMsSymptoms[key][isoDate] = data[key];
            }
  
            if (key.startsWith("hormonal")) {
              if (!tempHormonalSymptoms[key]) tempHormonalSymptoms[key] = {};
              tempHormonalSymptoms[key][isoDate] = data[key];
            }

             // NEW: always grab the amount fields
            if (key === "bleedingAmount") {
                tempBleedingAmounts[isoDate] = data[key];
              }
              if (key === "hormonalBleedingAmount") {
                tempHormonalBleedingAmounts[isoDate] = data[key];
              }
          }
        }
      }
  
      // Final state setting (assumes you’ve declared state hooks for all)
      setDates(actualDates);
      setSymptomMap(tempSymptoms);
      setMsSymptomMap(tempMsSymptoms);
      setHormonalSymptomMap(tempHormonalSymptoms);
      setSelectedSymptom(Object.keys(tempSymptoms)[0] || '');
      setSelectedMsSymptom(Object.keys(tempMsSymptoms)[0] || '');
      setSelectedHormonalSymptom(Object.keys(tempHormonalSymptoms)[0] || '');
      setGender(genderFound);
      setCycleType(cycleTypeFound);
      setLoading(false);
      setBleedingAmountMap(tempBleedingAmounts);
      setHormonalBleedingAmountMap(tempHormonalBleedingAmounts);
    };
  
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchData(user);
      } else {
        console.warn('User not logged in yet');
      }
    });
  
    return () => unsubscribe();
  }, []);


  // If data is currently loading show an indicactor for the user

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const getPaddedChartData = (data, dateList, viewRange) => {
    if (!data || !dateList || dateList.length === 0) return { labels: [], values: [] };
  
    // Build a map of date -> value
    const dateValueMap = {};
    dateList.forEach((date, idx) => {
      dateValueMap[date] = data[idx];
    });
  
    const startDate = new Date(dateList[0]);
    const paddedDates = [];
    const paddedValues = [];
  
    for (let i = 0; i < 60; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const iso = date.toISOString().split("T")[0];
  
      paddedDates.push(iso);
      paddedValues.push(dateValueMap[iso] ?? null); // use null for missing days
    }
  
    const startIndex = viewRange === 'first' ? 0 : 30;
  
    return {
      labels: paddedDates.slice(startIndex, startIndex + 30).map(d => d.slice(5)),
      values: paddedValues.slice(startIndex, startIndex + 30),
      iso:    paddedDates.slice(startIndex, startIndex + 30),
    };
  };
  
  //overall
  const getSummedMsSymptomData = (msSymptomMap, dates) => {
    return dates.map(date => {
      let sum = 0;
      for (const key in msSymptomMap) {
        const value = msSymptomMap[key][date];
        if (typeof value === 'number') {
          sum += value;
        }
      }
      return sum;
    });
  };
  
  const msSymptomData =
  selectedMsSymptom === 'overall'
    ? getSummedMsSymptomData(msSymptomMap, dates)
    : dates.map(date => {
        const val = msSymptomMap[selectedMsSymptom]?.[date];
        return typeof val === 'number' ? val : null;
      });

  const getMode = (arr) => {
    const frequencyMap = {};
    let maxFreq = 0;
    let mode = arr[0];
  
    for (const num of arr) {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  
      if (frequencyMap[num] > maxFreq) {
        maxFreq = frequencyMap[num];
        mode = num;
      }
    }
  
    return mode;
  };

  //-------- cycle logic
  const calculateSymptomIndex = (symptomMap, dates) => {
    return dates.map(date => {
      const severities = [];
  
      for (const key in symptomMap) {
        if (!key.includes('Severity')) continue; // ✅ Only include proper severity keys
        const val = symptomMap[key]?.[date];
        if (typeof val === 'number') {
          severities.push(val);
        }
      }
  
      if (severities.length === 0) return null;
  
      const frequency = severities.length;

      
      const severity = getMode(severities);

      const total = frequency * severity

      console.log(date , total)
      console.log("Frequency: ", frequency) 
      console.log("Severity: ", severity) 
  
      return total;
    });
  };
  
    // Compute cycle symptom data (Menstrual or Hormonal)
    const cycleSymptomData = cycleType === "Menstrual"
    ? (selectedSymptom === 'overall'
        ? calculateSymptomIndex(symptomMap, dates)
        : dates.map(date => {
            const val = symptomMap[selectedSymptom]?.[date];
            return typeof val === 'number' ? val : null;
          }))
    : (selectedHormonalSymptom === 'overall'
        ? calculateSymptomIndex(hormonalSymptomMap, dates)
        : dates.map(date => {
            const val = hormonalSymptomMap[selectedHormonalSymptom]?.[date];
            return typeof val === 'number' ? val : null;
          }));

    // Raw bleeding data
    const rawBleed = cycleType === 'Menstrual'
    ? dates.map(d => bleedingAmountMap[d] ?? null)
    : dates.map(d => hormonalBleedingAmountMap[d] ?? null);

    // Generate padded chart data
    const chartMs = getPaddedChartData(msSymptomData, dates, viewRangeMs);
    const chartCycle = getPaddedChartData(cycleSymptomData, dates, viewRangeCycle);
    const chartBleedMs = getPaddedChartData(rawBleed, dates, viewRangeMs);
    const chartBleedCycle = getPaddedChartData(rawBleed, dates, viewRangeCycle);

    // ✅ Red dots now only show for bleeding ≥ 1 in currently displayed chart view
    const redDotIndexesMs = chartBleedMs.values
    .map((v, i) => (v !== null && v >= 1 ? i : null))
    .filter(i => i !== null);

    const redDotIndexesCycle = chartBleedCycle.values
    .map((v, i) => (v !== null && v >= 1 ? i : null))
    .filter(i => i !== null);

    // Picker options
    const msSymptomPickerData = [
    { label: 'Overall', value: 'overall' },
    ...Object.keys(msSymptomMap).map((key) => ({
      label: key.replace("ms", "").replace("Severity", ""),
      value: key,
    })),
    ];

    const hormonalSymptomPickerData = [
    { label: 'Overall', value: 'overall' },
    ...Object.keys(hormonalSymptomMap).map((key) => ({
      label: key.replace("hormonal", "").replace("Severity", ""),
      value: key,
    })),
    ];

    const menstrualSymptomPickerData = [
    { label: 'Overall', value: 'overall' },
    ...Object.keys(symptomMap).map((key) => ({
      label: key.replace("menstrual", "").replace("Severity", ""),
      value: key,
    })),
    ];

  if (gender === "Male") {
    return (
      <View style={{ flex: 1 }}>
        <BackgroundGradient />
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>

        {/* Title */}

          <Text style={styles.title}>MS Symptoms</Text>
  
        <CustomPicker
        selectedValue={selectedMsSymptom}
        onValueChange={setSelectedMsSymptom}
        data={msSymptomPickerData}
      />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
          <Text
            onPress={() => setViewRangeMs('first')}
            style={{
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 16,
              backgroundColor: viewRangeMs === 'first' ? '#FFA388' : '#ccc',
              borderRadius: 6,
              textAlign: 'center',
              minWidth: 120, // Ensures buttons don't collapse
            }}
          >
            First 30 Days
          </Text>
          <Text
            onPress={() => setViewRangeMs('second')}
            style={{
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 16,
              backgroundColor: viewRangeMs === 'second' ? '#FFA388' : '#ccc',
              borderRadius: 6,
              textAlign: 'center',
              minWidth: 120,
            }}
          >
            Second 30 Days
          </Text>
        </View>

        <View style={{ position: 'relative', width: screenWidth - 40 }}>
          <View style={styles.yAxisLabelWrapperMs}>
            <Text style={styles.yAxisLabel}>Symptom Severity</Text>
          </View>
          <LineChart
            data={{
              labels: chartMs.labels,
              datasets: [
                {
                  data: chartMs.values,
                  color: (opacity = 1) => 'rgba(255, 226, 213, ${opacity})',
                  strokeWidth: 2,
                  withDots: true,
                },
                { data: [1], withDots: false },
                { data: [6], withDots: false },
              ],
            }}
            width={screenWidth - 40}
            height={300}
            fromZero={true}
            segments={6}
            chartConfig={{
              backgroundGradientFrom: "#B0E0E6",
              backgroundGradientTo: "#E0FFFF",
              decimalPlaces: 0,
              color: (opacity = 1) => 'rgba(0,0,0,${opacity})',
              labelColor: (opacity = 1) => 'rgba(0, 0, 0, ${opacity})',
              propsForBackgroundLines: {
                stroke: '#E0FFFF',
              },
              propsForHorizontalLabels: {
                fontSize: 10,
                rotation: 45,
              },
              propsForVerticalLabels: {
                fontSize: 10,
                rotation: 60,
              },
            }}
            bezier
            style={{
              borderRadius: 16,
              marginVertical: 10,
              paddingRight: 20,
              paddingBottom: 0,
            }}
          />
        </View>

      {/* Disclaimer */}

      <Text style = {styles.boldened}>Disclaimer:</Text>

      <View style = {styles.padded}>
        <Text>
          This application is designed for tracking symptoms related to multiple sclerosis (MS),
          the menstrual cycle, and hormonal contraceptive use. It is 
        <Text style = {styles.boldened}> not </Text>
          a diagnostic tool and does 
        <Text style = {styles.boldened}> not </Text>
          replace professional medical advice.
        </Text>
      </View>

        <View style = {styles.padded}>
          <Text>
            If you have any concerns about your 
            <Text style = {styles.boldened}> MS symptoms, menstrual cycle symptoms, or hormonal contraceptive use, </Text>
            or if you experience any 
            <Text style = {styles.boldened}> worsening, unusual, or distressing symptoms, </Text>
            please contact your 
            <Text style = {styles.boldened}> GP, MS nurse, or other healthcare professional </Text>
            for further advice.
          </Text>
        </View>

        <View style = {styles.padded}>
          <Text>In case of 
          <Text style = {styles.boldened}> urgent medical concerns, </Text>
            seek immediate medical attention.</Text>
        </View> 

        {/* Images */}

        <View style = {styles.imagecontainer}>
        <Image 
        style = {styles.logo}
        source = {require("app/images/MSsocietyLogo.png")}
        resizeMode='contain'
        />

        <Image 
        style = {styles.logo}
        source = {require("app/images/NorthumbriaLogo.png")}
        resizeMode='contain'
        />

        <Image 
        style = {styles.logo}
        source = {require("app/images/MStogetherLogo.png")}
        resizeMode='contain'
        />
        </View> 
        </ScrollView>
        <BackOnlyFooter prevPage="screens/MenuScreen" />
      </View>
    );


    // Female Graph ----------------------------------------------------------------------------------------------
  } else if (gender === "Female") {
    const isMenstrual = cycleType === "Menstrual";
    const dataMap = isMenstrual ? symptomMap : hormonalSymptomMap;
    
   
    return (
      <View style={{ flex: 1}}>
        <BackgroundGradient />
        <ScrollView
            contentContainerStyle={[
              styles.scrollContent // Keep the padding for the footer if needed
            ]}
            showsVerticalScrollIndicator={false}
          >
          <Text style={styles.title}>
            {isMenstrual ? "Menstrual Cycle Symptoms" : "Hormonal Cycle Symptoms"}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
            <Text
              onPress={() => setViewRangeCycle('first')}
              style={{
                marginHorizontal: 10,
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: viewRangeCycle === 'first' ? '#FFA388' : '#ccc',
                borderRadius: 6,
                textAlign: 'center',
                minWidth: 120, // Ensures buttons don't collapse
              }}
            >
              First 30 Days
            </Text>
            <Text
              onPress={() => setViewRangeCycle('second')}
              style={{
                marginHorizontal: 10,
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: viewRangeCycle === 'second' ? '#FFA388' : '#ccc',
                borderRadius: 6,
                textAlign: 'center',
                minWidth: 120,
              }}
            >
              Second 30 Days
            </Text>
          </View>
  
          <CustomPicker
            selectedValue={isMenstrual ? selectedSymptom : selectedHormonalSymptom}
            onValueChange={isMenstrual ? setSelectedSymptom : setSelectedHormonalSymptom}
            data={isMenstrual ? menstrualSymptomPickerData : hormonalSymptomPickerData}
          />

          <View style={styles.legendContainer}>
            <View style={styles.legendDot} />
            <Text style={styles.legendLabel}>Bleeding period</Text>
          </View>
          <View style={styles.chartRow}>
            <View style={styles.yAxisLabelWrapper}>
              <Text style={styles.yAxisLabel}>Symptom Severity</Text>
            </View>

            <LineChart
              data={{
                labels: chartCycle.labels,
                datasets: [
                  {
                    data: chartCycle.values,
                    color: (opacity = 1) => 'rgba(255, 226, 213, ${opacity})',
                    strokeWidth: 2,
                    withDots: true,
                  },
                  { data: [1], withDots: false },
                  { data: [6], withDots: false },
                ],
              }}
              width={screenWidth - 40}
              height={300}
              fromZero
              segments={7}
              chartConfig={{
                backgroundGradientFrom: "#FFA388",
                backgroundGradientTo: "#FFE1DB",
                decimalPlaces: 0,
                color: (opacity = 1) => 'rgba(0,0,0,${opacity})',
                labelColor: (opacity = 1) => 'rgba(0, 0, 0, ${opacity})',
                propsForBackgroundLines: { stroke: "#FFE1DB" },
                propsForHorizontalLabels: { fontSize: 10, rotation: 45 },
                propsForVerticalLabels:   { fontSize: 10, rotation: 60 },
              }}
              bezier
              style={{
                borderRadius: 16,
                marginVertical: 10,
                paddingRight: 20,
              }}

              
              /* ──────────────────────────────────────────────────────────
                Overlay red circles where bleedingAmount/hormonalBleedingAmount > 2
                (works even on Chart-Kit versions that ignore getDotColor)
              ────────────────────────────────────────────────────────── */
              renderDotContent={({ x, y, index }) =>
                redDotIndexesCycle.includes(index) ? (
                  <Circle
                    key={`cycle-dot-${viewRangeCycle}-${index}`}  // 🔑 key must include viewRange to force rerender
                    cx={x}
                    cy={y}
                    r={4}
                    fill="#FF0000"
                  />
                ) : null
              }
              
            />

          </View>
  
          <Text style={styles.title}>MS Symptoms</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
            <Text
              onPress={() => setViewRangeMs('first')}
              style={{
                marginHorizontal: 10,
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: viewRangeMs === 'first' ? '#FFA388' : '#ccc',
                borderRadius: 6,
                textAlign: 'center',
                minWidth: 120, // Ensures buttons don't collapse
              }}
            >
              First 30 Days
            </Text>
            <Text
              onPress={() => setViewRangeMs('second')}
              style={{
                marginHorizontal: 10,
                paddingVertical: 10,
                paddingHorizontal: 16,
                backgroundColor: viewRangeMs === 'second' ? '#FFA388' : '#ccc',
                borderRadius: 6,
                textAlign: 'center',
                minWidth: 120,
              }}
            >
              Second 30 Days
            </Text>
          </View>

  
          <CustomPicker
          selectedValue={selectedMsSymptom}
          onValueChange={setSelectedMsSymptom}
          data={msSymptomPickerData}
        />
        

          
          <View style={styles.legendContainer}>
            <View style={styles.legendDot} />
            <Text style={styles.legendLabel}>Bleeding period</Text>
          </View>
  
          <View style={{ position: 'relative', width: screenWidth - 40 }}>
            <View style={styles.yAxisLabelWrapperMs}>
              <Text style={styles.yAxisLabel}>Symptom Severity</Text>
            </View>

         
            <LineChart
              data={{
                labels: chartMs.labels,
                datasets: [
                  {
                    data: chartMs.values,
                    color: (opacity = 1) => 'rgba(255, 226, 213, ${opacity})',
                    strokeWidth: 2,
                    withDots: true,
                  },
                  { data: [1], withDots: false },
                  { data: [6], withDots: false },
                ],
              }}
              width={screenWidth - 40}
              height={300}
              fromZero={true}
              segments={6}
              chartConfig={{
                backgroundGradientFrom: "#B0E0E6",
                backgroundGradientTo: "#E0FFFF",
                decimalPlaces: 0,
                color: (opacity = 1) => 'rgba(0,0,0,${opacity})',
                labelColor: (opacity = 1) => 'rgba(0, 0, 0, ${opacity})',
                propsForBackgroundLines: {
                  stroke: '#E0FFFF',
                },
                propsForHorizontalLabels: {
                  fontSize: 10,
                  rotation: 45,
                },
                propsForVerticalLabels: {
                  fontSize: 10,
                  rotation: 60,
                },
              }}
              bezier
              style={{
                borderRadius: 16,
                marginVertical: 10,
                paddingRight: 20,
                paddingBottom: 0,
              }}

              renderDotContent={({ x, y, index }) =>
                redDotIndexesMs.includes(index) ? (
                  <Circle
                    key={`ms-dot-${viewRangeMs}-${index}`}  // 🔑 include viewRangeMs to invalidate old dots
                    cx={x}
                    cy={y}
                    r={4}
                    fill="#FF0000"
                  />
                ) : null
              }
            />
          </View>
  
          {/* Disclaimer */}
          <View style={styles.padded}>
            <Text>
              If you have any concerns about your
              <Text style={styles.boldened}> MS symptoms, menstrual cycle symptoms, or hormonal contraceptive use, </Text>
              or if you experience any
              <Text style={styles.boldened}> worsening, unusual, or distressing symptoms, </Text>
              please contact your
              <Text style={styles.boldened}> GP, MS nurse, or other healthcare professional </Text>
              for further advice.
            </Text>
          </View>
  
          <View style={styles.padded}>
            <Text>
              In case of
              <Text style={styles.boldened}> urgent medical concerns, </Text>
              seek immediate medical attention.
            </Text>
          </View>
  
          {/* Images */}
          <View style={styles.imagecontainer}>
            <Image
              style={styles.logo}
              source={require("app/images/MSsocietyLogo.png")}
              resizeMode='contain'
            />
  
            <Image
              style={styles.logo}
              source={require("app/images/NorthumbriaLogo.png")}
              resizeMode='contain'
            />
  
            <Image
              style={styles.logo}
              source={require("app/images/MStogetherLogo.png")}
              resizeMode='contain'
            />
          </View>
        </ScrollView>
        <BackOnlyFooter prevPage="screens/MenuScreen" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldened: {
    fontWeight: 'bold',
  },
  padded: {
    paddingTop: 10,
  },    
  yAxisLabelContainerMenstrual: {
    position: 'absolute',
    left: -58, // Adjust as needed to place label outside Y-axis
    top: '35%',
    transform: [{ translateY: '-50%'}],
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 280, // Match chart height if possible
  },
  
  yAxisLabelContainerMs: {
    position: 'absolute',
    left: -58,
    top: '75%',
    transform: [{ translateY: '-50%' }],
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
  },

  yAxisLabelContainerMsMale: {
    position: 'absolute',
    left: -55,
    top: -160,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  yAxisLabel: {
    fontSize: 16,
    transform: [{ rotate: '-90deg' }],
  },
  imagecontainer: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 60,
    width:"100%",
  },
  logo: {
    flex: 1,
    width: 0, // if undefined it looks weird
    height: "100%",
  },  
  northumbriaLogo: {
    flex: 0,
    width: 0, // if undefined it looks weird
    height: "150%",
  },   
  scrollContent: {
    flexGrow: 1, // Add this line
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
  },

  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  
  yAxisLabelWrapper: {
    position: 'absolute',
    top: '55%',
    left: -70, // or tweak based on visual alignment
    transform: [{ translateY: -25 }], // half of height to center
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  yAxisLabelWrapperMs: {
    position: 'absolute',
    top: '50%',
    left: -70, // Adjust to fine-tune position
    transform: [{ translateY: -25 }],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  
  yAxisLabel: {
    transform: [{ rotate: '-90deg' }],
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },

  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',   // same red as overlay
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: '#000',
  },
  
  
});