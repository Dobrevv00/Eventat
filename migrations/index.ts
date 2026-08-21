import * as migration_20260820_135035_contact_submissions from './20260820_135035_contact_submissions';
import * as migration_20260821_082749_cms_content_schema from './20260821_082749_cms_content_schema';

export const migrations = [
  {
    up: migration_20260820_135035_contact_submissions.up,
    down: migration_20260820_135035_contact_submissions.down,
    name: '20260820_135035_contact_submissions',
  },
  {
    up: migration_20260821_082749_cms_content_schema.up,
    down: migration_20260821_082749_cms_content_schema.down,
    name: '20260821_082749_cms_content_schema'
  },
];
