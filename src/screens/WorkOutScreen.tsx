import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, Alert, Pressable, StyleSheet } from 'react-native';

function WorkoutScreen({ navigation }) {
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

    // Constant Lengths of Time
    const workoutTimeInSeconds = 420;
    const exerciseIntervalsInSeconds = 29;
    const breakTimeInSeconds = 9;
    const cancelTime = 5;

    // Use to test faster
    // const workoutTimeInSeconds = 50;
    // const exerciseIntervalsInSeconds = 2;
    // const breakTimeInSeconds = 2;

    // State Hooks for timers
    const [workoutTime, setWorkoutTime] = useState(workoutTimeInSeconds);
    const [excerciseTime, setExerciseTime] = useState(exerciseIntervalsInSeconds);
    const [breakTime, setBreakTime] = useState(0);
    const [exerciseCount, setExerciseCount] = useState(1);
    const [onBreak, setBreak] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);
    const [cancel, setCancel] = useState(false);
    let textLog = '';
    if (timesPressed > 1) {
        textLog = timesPressed + 'x onPress';
    } else if (timesPressed > 0) {
        textLog = 'onPress';
    }

    // Main Timer Use Effect
    useEffect(() => {
        const workoutInterval = setInterval(() => {
            if (workoutTime === 0) {
                Alert.alert('Workout Complete');
                navigation.navigate('Home');
                clearInterval(workoutInterval);
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
                if (exerciseCount > exerciseNames.length) {
                    Alert.alert('Workout Complete');
                    navigation.navigate('Home');
                }

                clearInterval(exerciseInterval);
                if (exerciseCount % 2 === 0) {
                    setBreakTime(breakTimeInSeconds);
                    setBreak(true);
                } else {
                    setExerciseTime(exerciseIntervalsInSeconds);
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
                if (exerciseCount > exerciseNames.length) {
                    Alert.alert('Workout Complete');
                    navigation.navigate('Home');
                }
                clearInterval(breakInterval);
                setExerciseTime(exerciseIntervalsInSeconds);
                setBreak(false);
                return;
            }
            setBreakTime((prevIntervalCountdown) => prevIntervalCountdown - 1);
        }, 1000);

        return () => clearInterval(breakInterval);
    }, [breakTime]);

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable
                onPressIn={() => {
                    setCancel(true)
                    let cancelCount = setInterval(() => {
                        setTimesPressed(current => current + 1);
                        if (cancelTime - timesPressed === 0) {
                            clearInterval(cancelCount)
                            navigation.navigate('Home')
                            Alert.alert('Workout failed')
                        }
                    }, 1000);
                }}
                onPressOut={() => {
                    navigation.navigate('Home')
                    Alert.alert('Workout failed')
                }}
                delayLongPress={(cancelTime * 1000)}
                onLongPress={() => {
                    Alert.alert('Workout failed')
                }}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    },
                    styles.wrapperCustom,
                ]}>

                <Text>Timer: {workoutTime} seconds</Text>
                {!onBreak ? (
                    <>
                        <Image source={images[exerciseCount - 1]} />
                        <Text>
                            Exercise #{exerciseCount}: {exerciseNames[exerciseCount - 1]}
                        </Text>
                        <Text>Exercise Countdown: {excerciseTime} seconds</Text>
                    </>
                ) : (
                    <>
                        <Text>Break Time! </Text>
                        <Text>Break Countdown: {breakTime} seconds </Text>
                    </>
                )}

                {cancel && <Text style={{ color: 'red' }}>Canceling in {cancelTime - timesPressed}</Text>}

            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
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