import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';

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

    // Main Timer Use Effect
    useEffect(() => {
        const workoutInterval = setInterval(() => {
            if (workoutTime === 0) {
                Alert.alert('Workout Complete');
                navigation.navigate('home');
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
                    navigation.navigate('home');
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
                    navigation.navigate('home');
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
        </View>
    );
}

export default WorkoutScreen