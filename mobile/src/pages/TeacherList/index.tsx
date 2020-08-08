import React, { useState } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList(){
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const[subject, setSubject] = useState('');
  const[week_day, setWeek_day] = useState('');
  const[time, setTime] = useState('');
  const[favorites, setFavorites] = useState<number[]>([]);

  function loadFavorites(){
    AsyncStorage.getItem('favorites').then(res => {
      if(res){
        const favoritedTeachers = JSON.parse(res);
        const favoritesTeachersId = favoritedTeachers.map((teacher: Teacher) =>{
          return teacher.id;
        });
        setFavorites(favoritesTeachersId);
      }
    });
  }

  useFocusEffect(()=>{
    loadFavorites();
  });
  
  const [teachers, setTeachers] = useState([]);

  function handleToggleFiltersVisible(){
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit(){
    loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}  
      >
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Máterias</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a máteria"
              placeholderTextColor='#C1BCCC'
              value={subject}
              onChangeText={text=> setSubject(text)} 
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia"
                  placeholderTextColor='#C1BCCC'
                  value={week_day}
                  onChangeText={text=> setWeek_day(text)} 
                /> 
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário"
                  placeholderTextColor='#C1BCCC'
                  value={time}
                  onChangeText={text=> setTime(text)} 
                /> 
              </View>
            </View>
            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal:16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher:Teacher) => {
          return (
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorited={favorites.includes(teacher.id)} 
            />
          )
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;