import { validateContent } from '../lib/content/load';

validateContent()
  .then(({ collections }) => {
    console.log('Content valid.');
    for (const [name, entries] of Object.entries(collections))
      console.log(
        `  ${name}: ${entries.length} entries (${entries.filter((entry) => entry.data.draft).length} drafts)`,
      );
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
