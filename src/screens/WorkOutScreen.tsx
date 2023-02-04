import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, Alert, Pressable, StyleSheet, Button } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useSelector } from 'react-redux';
import { truncate } from '../constants/Truncate';
import { RootState } from '../store';

// destructured
function WorkoutScreen({ navigation }) {
  const isGuest = useSelector((state: RootState) => state.login.guest);

  let profile: any[] = []

  const loggedin = useSelector((state: RootState) => state.login.loggedIn);
  for (const [key, value] of Object.entries(loggedin)) {
    // console.log(`${key}: ${value}`);
    profile.push(key, value)
  }
  function getField(name: string) {
    return profile?.valueOf(name)
  }

  const address = JSON.stringify(getField("address")[11])?.replace(/["]/g, "")
  const key = JSON.stringify(getField("address")[1])?.replace(/["]/g, "")


  // image 9 too big, image 10 not centered
  const images = [
    require('../assets/images/workout-images/image1.gif'),
    require('../assets/images/workout-images/image2.gif'),
    require('../assets/images/workout-images/image3.gif'),
    require('../assets/images/workout-images/image4.gif'),
    require('../assets/images/workout-images/image5.gif'),
    require('../assets/images/workout-images/image6.gif'),
    require('../assets/images/workout-images/image7.gif'),
    require('../assets/images/workout-images/image8.gif'),
    require('../assets/images/workout-images/image9.gif'),
    require('../assets/images/workout-images/image10.gif'),
    require('../assets/images/workout-images/image11.gif'),
    require('../assets/images/workout-images/image12.gif'),
  ];

  const exerciseNames = [
    'Jumping Jacks',
    'Wall Sits',
    'Push Ups',
    'Sit Ups',
    'Step Ups',
    'Squats',
    'Chair Dips',
    'Plank',
    'High Knees',
    'Lunges',
    'Push and Rotate',
    'Side Plank (15 seconds Each Side)',
  ];

  const execeriseTime = 29;
  const breakTimeConst = 9;
  const totalExerciseConst = 420;
  const calories = 105

  // For Testing Faster
  // const totalExerciseConst = 20;

  const [workoutTime, setWorkoutTime] = useState(totalExerciseConst);
  const [excerciseTime, setExerciseTime] = useState(execeriseTime);
  const [breakTime, setBreakTime] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(1);
  const [onBreak, setBreak] = useState(false);




  // Main Timer Use Effect
  useEffect(() => {
    const workoutInterval = setInterval(() => {
      if (workoutTime === 0) {
        clearInterval(workoutInterval);
        Alert.alert('7 minutes have passed!');

        navigation.navigate('Completed', {
          exercises: exerciseNames,
          exerciseTime: totalExerciseConst,
          calories,
          address,
          key,
          isGuest
        })

        return;
      }
      setWorkoutTime((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(workoutInterval);
  }, [workoutTime]);


  // Exercise Timer Use Effect
  useEffect(() => {
    const exerciseInterval = setInterval(() => {
      if (excerciseTime === 0) {
        setExerciseCount((prevCount) => prevCount + 1);
        clearInterval(exerciseInterval);
        if (exerciseCount % 2 === 0) {
          setBreakTime(breakTimeConst);
          setBreak(true);
        } else {
          setExerciseTime(execeriseTime);
          setBreak(false);
        }
        return;
      }
      setExerciseTime((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(exerciseInterval);
  }, [excerciseTime]);


  // Break Timer Use Effect
  useEffect(() => {
    const breakInterval = setInterval(() => {
      if (breakTime === 0) {
        clearInterval(breakInterval);
        setExerciseTime(execeriseTime);
        setBreak(false);
        return;
      }
      setBreakTime((prevIntervalCountdown) => prevIntervalCountdown - 1);
    }, 1000);
    return () => clearInterval(breakInterval);
  }, [breakTime]);

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={styles.titleText}>
        Exercise #{exerciseCount}: {exerciseNames[exerciseCount - 1]}
      </Text>


      {!onBreak ? (
        <>
          <Image style={{
            resizeMode: 'cover',
            height: 300,
            width: 300,
          }}
            source={images[exerciseCount - 1]} />

          <Text style={styles.timerText}>{workoutTime} to go!</Text>

          <CountdownCircleTimer
            isPlaying
            duration={29}
            colors={['#00FF00', '#FF0000']}
            colorsTime={[29, 0]}
            onComplete={() => {
              // do your stuff here
              return { shouldRepeat: true, delay: 1 } // repeat animation in 1 seconds
            }}
          >
            {({ remainingTime }) => <Text style={styles.numberText}>{excerciseTime}</Text>}
          </CountdownCircleTimer>

          <Button
            title="Cancel workout"
            onPress={() => navigation.navigate('Main')}
          />
        </>
      ) : (
        <>
          <Text style={styles.titleText}>Break Time! </Text>
          <CountdownCircleTimer
            isPlaying
            duration={10}
            colors="#0080ff"
            onComplete={() => {
              // do your stuff here
              return { shouldRepeat: false } // repeat animation in 1.5 seconds
            }}
          >
            {({ remainingTime }) => <Text style={styles.numberText}>{breakTime}</Text>}
          </CountdownCircleTimer>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,

  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'

  },
  bodyText: {
    fontSize: 22,
    fontFamily: 'Helvetica'

  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },
  numberText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Helvetica'
  },

  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});


export default WorkoutScreen