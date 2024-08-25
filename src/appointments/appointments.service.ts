import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import * as config from '../../config.json';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async getAvailableSlots(date: string): Promise<any[]> {
    if (config.daysOff.includes(date)) {
      return [];
    }

    const appointments = await this.appointmentRepository.find({
      where: { date },
    });
    const slots = [];
    const startTime = this.timeStringToMinutes(config.operationalHours.start);
    const endTime = this.timeStringToMinutes(config.operationalHours.end);
    const slotDuration = config.slotDuration;

    for (let time = startTime; time < endTime; time += slotDuration) {
      const slotTime = this.minutesToTimeString(time);
      if (this.isWithinUnavailableHours(slotTime)) continue;

      const availableSlots =
        config.maxSlotsPerAppointment -
        appointments.filter((a) => a.time === slotTime).length;
      slots.push({ date, time: slotTime, available_slots: availableSlots });
    }

    return slots;
  }

  async bookAppointment(
    date: string,
    time: string,
    email: string,
  ): Promise<{ message: string }> {
    const existingAppointments = await this.appointmentRepository.find({
      where: { date, time },
    });

    if (existingAppointments.length >= config.maxSlotsPerAppointment) {
      return { message: 'Slot is not available' };
    }

    const appointment = new Appointment();
    appointment.date = date;
    appointment.time = time;
    appointment.email = email;
    await this.appointmentRepository.save(appointment);

    return { message: 'Appointment booked successfully' };
  }

  async cancelAppointment(
    date: string,
    time: string,
    email: string,
  ): Promise<{ message: string }> {
    const appointment = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .where('appointment.date = :date', { date })
      .andWhere('appointment.time = :time', { time })
      .andWhere('appointment.email = :email', { email })
      .getOne();

    if (!appointment) {
      return { message: 'Appointment not found' };
    }

    await this.appointmentRepository.remove(appointment);
    return { message: 'Appointment canceled successfully' };
  }

  private timeStringToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTimeString(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  private isWithinUnavailableHours(time: string): boolean {
    const timeInMinutes = this.timeStringToMinutes(time);
    const lunchBreakStart = this.timeStringToMinutes(
      config.unavailableHours.lunchBreak.start,
    );
    const lunchBreakEnd = this.timeStringToMinutes(
      config.unavailableHours.lunchBreak.end,
    );

    return timeInMinutes >= lunchBreakStart && timeInMinutes < lunchBreakEnd;
  }
}
