import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, Alert, Pressable, StyleSheet, Button } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import CancelButton from '../components/CancelButton';

// destructured
function WorkoutScreen({ navigation }) {
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

    // WORKOUT COMPLETE
    // if(exerciseCount === 13) 
    //     alert("all done");

   
       
   
    
  

    // // Constant Lengths of Time
    // const workoutTimeInSeconds = 420;
    // const exerciseIntervalsInSeconds = 29;
    // const breakTimeInSeconds = 9;
     const defaultCancelTime = 5;

    // // Use to test faster
    // // const workoutTimeInSeconds = 50;
    // // const exerciseIntervalsInSeconds = 2;
    // // const breakTimeInSeconds = 2;

    // // State Hooks for timers
    // const [workoutTime, setWorkoutTime] = useState(workoutTimeInSeconds);
    // const [excerciseTime, setExerciseTime] = useState(exerciseIntervalsInSeconds);
    // const [breakTime, setBreakTime] = useState(0);
    // const [exerciseCount, setExerciseCount] = useState(1);
    // const [onBreak, setBreak] = useState(false);

    // // For Hold To Cancel
    //  const [canceling, setCanceling] = useState(false);
    //  const [isCanceled, setIsCanceled] = useState(false);
    //  const [cancelTime, setCancelTime] = useState(defaultCancelTime);


    // // Cancel Workout Timer
    // useEffect(() => {
    //     let cancelCount = setInterval(() => {
    //         setCancelTime(current => current - 1);
    //         console.log('Time til cancel:', cancelTime)

    //         if (cancelTime === 0) {
    //             clearInterval(cancelCount)
    //             setIsCanceled(true)
    //         }

    //         if (!canceling) {
    //             clearInterval(cancelCount)
    //             setIsCanceled(false)
    //         }react native 
    //     }, 1000);

    //     if (cancelTime === 0) {
    //         Alert.alert('Workout failed')
    //         navigation.navigate('Main')
    //     }

    //     if (!canceling) {
    //         setCancelTime(defaultCancelTime);
    //     }
        
    //     return () => {
    //         clearInterval(cancelCount);
    //         setCancelTime(defaultCancelTime);

    //     }
    // }, [canceling])


    // // Main Timer Use Effect
    // useEffect(() => {
    //     const workoutInterval = setInterval(() => {
    //         if (workoutTime === 0) {
    //             Alert.alert('Workout Complete');
    //             navigation.navigate('Completed');
    //             clearInterval(workoutInterval);
    //             return;
    //         }

    //         setWorkoutTime((prevCountdown) => prevCountdown - 1);
    //     }, 1000);

    //     return () => clearInterval(workoutInterval);
    // }, [workoutTime]);

    // // Exercise Timer Use Effect
    // useEffect(() => {
    //     const exerciseInterval = setInterval(() => {
    //         if (excerciseTime === 0) {
    //             setExerciseCount((prevCount) => prevCount + 1);
    //             if (exerciseCount > exerciseNames.length) {
    //                 navigation.navigate('Completed');
    //                 clearInterval(exerciseInterval);
    //                 return
    //             }

    //             clearInterval(exerciseInterval);
    //             if (exerciseCount % 2 === 0) {
    //                 setBreakTime(breakTimeInSeconds);
    //                 setBreak(true);
    //             } else {
    //                 setExerciseTime(exerciseIntervalsInSeconds);
    //                 setBreak(false);
    //             }
    //             return;
    //         }

    //         setExerciseTime((prevCountdown) => prevCountdown - 1);
    //     }, 1000);

    //     return () => clearInterval(exerciseInterval);
    // }, [excerciseTime]);

    // // Break Timer Use Effect
    // useEffect(() => {
    //     const breakInterval = setInterval(() => {
    //         if (breakTime === 0) {
    //             if (exerciseCount > exerciseNames.length) {
    //                 navigation.navigate('Completed');
    //                 clearInterval(breakInterval);
    //                 return
    //             }
    //             clearInterval(breakInterval);
    //             setExerciseTime(exerciseIntervalsInSeconds);
    //             setBreak(false);
    //             return;
    //         }
    //         setBreakTime((prevIntervalCountdown) => prevIntervalCountdown - 1);
    //     }, 1000);

    //     return () => clearInterval(breakInterval);
    // }, [breakTime]);

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/* <Pressable

                onPressIn={() => {
                    setCanceling(true)
                }}

                onPressOut={() => {
                    !isCanceled
                        ? () => { setCanceling(false) }
                        : () => { navigation.navigate('Main') }
                }}

                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'red' : 'white',
                    },
                    styles.wrapperCustom,
                ]}> */}

                <Text style={styles.timerText}>{workoutTime} to go!</Text>

                {!onBreak ? (
                    <>
                        <Image style={{
                            resizeMode: 'cover',
                            height: 300,
                            width: 300, }}
                            source={images[exerciseCount - 1]} />
                        <Text style={styles.titleText}>
                            Exercise #{exerciseCount}: {exerciseNames[exerciseCount - 1]}
                        </Text>
                     
                        <CountdownCircleTimer
                          isPlaying
                          duration={29}
                          colors={['#00FF00',  '#FF0000']}
                          colorsTime={[29, 0]}
                          size={240}
    
                          onComplete={() => {
                            // do your stuff here
                            return { shouldRepeat: true, delay: 1 } // repeat animation in 1 seconds
                          }}
                        >
                          
                          {({ remainingTime }) => <Text style={styles.numberText}>{excerciseTime}</Text>}
                        </CountdownCircleTimer>
                        {/* <Text style={styles.bodyText}>Countdown: {excerciseTime} seconds</Text> */}
                       
                       
                      
                        <CancelButton
                         label="Cancel workout"
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
                          size={240}
                          onComplete={() => {
                            // do your stuff here
                            return { shouldRepeat: false  } // repeat animation in 1.5 seconds
                          }}
                          >
                          {({ remainingTime }) => <Text style={styles.numberText}>{breakTime}</Text>}
                          </CountdownCircleTimer>
                        {/* <Text style={styles.bodyText}>Break Countdown: {breakTime} seconds </Text> */}
                    </>
                )}


            {/* </Pressable> */}

            {/* {canceling &&
                <>
                    <Button
                        title="Continue Workout"
                        onPress={() => {
                            setCanceling(false)
                        }}
                    />
                    <Text style={{ color: 'black' }}>Canceling in {cancelTime}</Text>
                </>
            } */}

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
    titleText : {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Helvetica',
        paddingTop: 10,
        paddingBottom : 40

    },
    bodyText: {
        fontSize: 22,
        fontFamily : 'Helvetica'

    },
    timerText : {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily : 'Helvetica'
    },
    numberText : {
        fontSize : 30,
        fontWeight : 'bold',
        fontFamily : 'Helvetica'
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