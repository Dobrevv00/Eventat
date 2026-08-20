import * as migration_20260820_135035_contact_submissions from './20260820_135035_contact_submissions';

export const migrations = [
  {
    up: migration_20260820_135035_contact_submissions.up,
    down: migration_20260820_135035_contact_submissions.down,
    name: '20260820_135035_contact_submissions'
  },
];
