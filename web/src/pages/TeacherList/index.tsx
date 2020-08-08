import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList (){
  const [teachers, setTeacher] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function serachTeachers(e: FormEvent){
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    setTeacher(response.data)
  }

  return (
    <div id="page-teacher-list">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teacher" onSubmit={serachTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => { setSubject(e.target.value)}}
            options={[
              {value: 'Artes', label: 'Artes'},
              {value: 'Biologia', label: 'Biologia'},
              {value: 'Física', label: 'Física'},
              {value: 'Química', label: 'Química'},
              {value: 'Português', label: 'Português'},
              {value: 'Matemática', label: 'Matemática'},
              {value: 'Geografia', label: 'Geografia'},
              {value: 'Hitória', label: 'Hitória'},
              {value: 'Inglês', label: 'Inglês'},
              {value: 'Ed. Física', label: 'Ed. Física'},
              {value: 'Filosofia', label: 'Filosofia'},
              {value: 'Sociologia', label: 'Sociologia'},
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => { setWeekDay(e.target.value)}}
            options={[
              {value: '0', label: 'Domigo'},
              {value: '1', label: 'Segunda-feira'},
              {value: '2', label: 'Terça-feira'},
              {value: '3', label: 'Quarta-feira'},
              {value: '4', label: 'Quinta-feira'},
              {value: '5', label: 'Sexta-feira'},
              {value: '6', label: 'Sábado'},
            ]}
          />
          <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
            onChange={(e) => { setTime(e.target.value)}} 
          />
          <button type="submit">
            Buscar
          </button>
        </form> 
      </PageHeader> 

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>;
        })}
      </main>

    </div>
  );
}

export default TeacherList;