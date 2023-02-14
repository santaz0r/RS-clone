import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getDoctorsLoadingStatus, loadDoctorsList } from '../../../store/doctors';
import { loadSpecializationsList } from '../../../store/specializations';
import { loadSessionsList } from '../../../store/sessions';

function AppLoader({ children }: { children: React.ReactElement }) {
  const dispatch = useAppDispatch();
  const doctorsStatusLoading = useAppSelector(getDoctorsLoadingStatus());

  useEffect(() => {
    dispatch(loadDoctorsList());
    dispatch(loadSpecializationsList());
    dispatch(loadSessionsList());
  }, []);
  if (doctorsStatusLoading) return <h1>Loading</h1>;
  return children;
}

export default AppLoader;
