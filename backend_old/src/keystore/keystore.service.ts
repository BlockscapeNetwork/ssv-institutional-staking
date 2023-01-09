import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keystore } from './keystore.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class KeystoreService {
  constructor(
    @InjectRepository(Keystore)
    private readonly keystoreRepository: Repository<Keystore>,
  ) {}

  getKeystores(): Promise<Keystore[]> {
    return this.keystoreRepository.find();
  }

  getKeystoreById(id): Promise<Keystore> {
    return this.keystoreRepository.findOneOrFail({ where: { id } });
  }

  addKeystore(keystore: Keystore): Promise<Keystore> {
    return this.keystoreRepository.save(keystore);
  }

  deleteKeystore(keystoreID): Promise<DeleteResult> {
    return this.keystoreRepository.delete(keystoreID);
  }

  updateKeystore(id: number, keystore: Keystore): Promise<UpdateResult> {
    return this.keystoreRepository.update(id, keystore);
  }
}
