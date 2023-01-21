import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

export const VideoEditor = () => {
    // Create a reference to the video player
    const videoPlayer = useRef();

    // Set up state variables for the start and end times
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    // Function to set the start time
    const setStart = () => {
        // Get the current position of the video player
        const currentPosition = videoPlayer.current.getPositionAsync();
        // Update the start time in state
        setStartTime(currentPosition);
    }

    // Function to set the end time
    const setEnd = () => {
        // Get the current position of the video player
        const currentPosition = videoPlayer.current.getPositionAsync();
        // Update the end time in state
        setEndTime(currentPosition);
    }

    // Function to trim the video
    const trimVideo = () => {
        // Seek the video player to the start time
        videoPlayer.current.setPositionAsync(startTime);
        // Set the video player's end time to the end time
        videoPlayer.current.setStatusAsync({ shouldPlay: true, endTime });
    }

    return (
        <View style={styles.container}>
            <Video
                ref={videoPlayer}
                source={{ uri: 'path/to/video.mp4' }}
                style={styles.video}
            />
            <TouchableOpacity onPress={setStart} style={styles.button}>
                <Text>Set Start Time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={setEnd} style={styles.button}>
                <Text>Set End Time</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={trimVideo} style={styles.button}>
                <Text>Trim Video</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: '100%',
        height: 200,
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
});