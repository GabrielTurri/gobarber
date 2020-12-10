/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepositories';
// No service ficará apenas as regras de negócio
// o service nunca tem acesso as variaveis de request/response

import AppError from '../errors/AppError';

// DTO
interface Request {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    // salvando no banco de dados
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
