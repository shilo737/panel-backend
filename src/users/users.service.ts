import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userRepository.findOneBy({ id });
  }

  async create(user: Partial<User>): Promise<User> {
    if (!user.password) {
      throw new Error('Password is required');
    }
    const newUser = this.userRepository.create(user);
    console.log('newUser', newUser);
    newUser.password = await bcrypt.hash(user.password, 10);
    console.log('newUser', newUser);
    return this.userRepository.save(newUser);
  }

  async update(user: Partial<User>): Promise<User> {
    if (!user.id) {
      throw new NotFoundException('User ID is required for update');
    }
    const existingUser = await this.userRepository.findOneBy({ id: user.id });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }
    await this.userRepository.update(user.id, user);
    return (await this.userRepository.findOneBy({ id: user.id }))!;
  }
  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
}
