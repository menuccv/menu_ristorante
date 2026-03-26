import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import * as tar from 'tar'

const BACKUP_DIR_NAME = 'Backup'
const BACKUP_PREFIX = 'Backup'
const BACKUP_EXTENSION = '.tar.gz'
const ITALIAN_MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
]

function pad(value) {
  return String(value).padStart(2, '0')
}

function getBackupBaseName(date) {
  const day = pad(date.getDate())
  const month = ITALIAN_MONTHS[date.getMonth()]
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  return `${BACKUP_PREFIX}_${day} ${month}_${hours}.${minutes}`
}

async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function getUniqueBackupFilePath(backupDirPath, baseDate) {
  const candidate = new Date(baseDate)
  for (let minuteOffset = 0; minuteOffset < 24 * 60; minuteOffset += 1) {
    const baseName = getBackupBaseName(candidate)
    const fileName = `${baseName}${BACKUP_EXTENSION}`
    const filePath = path.join(backupDirPath, fileName)
    if (!(await fileExists(filePath))) {
      return { fileName, filePath }
    }
    candidate.setMinutes(candidate.getMinutes() + 1)
  }

  throw new Error(
    'Nessun nome backup disponibile nel formato Backup_DD Mese_HH.MM per le prossime 24 ore.',
  )
}

async function updateManifest(backupDirPath, fileName) {
  const manifestPath = path.join(backupDirPath, 'BACKUP_MANIFEST.json')
  const createdAtIso = new Date().toISOString()

  let entries = []
  if (await fileExists(manifestPath)) {
    const current = await fs.readFile(manifestPath, 'utf8')
    entries = JSON.parse(current)
  }

  const manifestByFileName = new Map(entries.map((entry) => [entry.fileName, entry]))

  const currentBackupFiles = (await fs.readdir(backupDirPath))
    .filter((entry) => entry.endsWith(BACKUP_EXTENSION))
    .sort((a, b) => a.localeCompare(b))

  for (const existingFileName of currentBackupFiles) {
    if (manifestByFileName.has(existingFileName)) {
      continue
    }
    const stats = await fs.stat(path.join(backupDirPath, existingFileName))
    manifestByFileName.set(existingFileName, {
      fileName: existingFileName,
      createdAtIso: stats.mtime.toISOString(),
    })
  }

  manifestByFileName.set(fileName, {
    fileName,
    createdAtIso,
  })

  entries = [...manifestByFileName.values()]

  entries.sort((a, b) => a.createdAtIso.localeCompare(b.createdAtIso))
  await fs.writeFile(manifestPath, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
}

async function createBackupArchive() {
  const rootDir = process.cwd()
  const backupDirPath = path.join(rootDir, BACKUP_DIR_NAME)
  await ensureDirectory(backupDirPath)

  const { fileName, filePath } = await getUniqueBackupFilePath(
    backupDirPath,
    new Date(),
  )

  const entries = (await fs.readdir(rootDir)).filter((entry) => entry !== BACKUP_DIR_NAME)
  entries.sort((a, b) => a.localeCompare(b))

  await tar.create(
    {
      cwd: rootDir,
      gzip: true,
      file: filePath,
      portable: true,
    },
    entries,
  )

  await updateManifest(backupDirPath, fileName)

  process.stdout.write(`${path.join(BACKUP_DIR_NAME, fileName)}\n`)
}

await createBackupArchive()
