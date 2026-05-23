import jsPDF from 'jspdf'
import { type PeptideReport } from '@/lib/report-generator'
import { categoryMap } from '@/data/categories'

// Constants
const PAGE_WIDTH = 210
const MARGIN = 20
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const LINE_HEIGHT = 6
const SECTION_GAP = 10

function addPageFooter(doc: jsPDF, pageNum: number) {
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFontSize(7)
  doc.setTextColor(150)
  doc.text(
    'This report is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional.',
    PAGE_WIDTH / 2,
    pageHeight - 10,
    { align: 'center' }
  )
  doc.text(`Page ${pageNum}`, PAGE_WIDTH - MARGIN, pageHeight - 10, { align: 'right' })
}

function checkPageBreak(doc: jsPDF, y: number, needed: number, pageNum: { value: number }): number {
  const pageHeight = doc.internal.pageSize.getHeight()
  if (y + needed > pageHeight - 20) {
    addPageFooter(doc, pageNum.value)
    doc.addPage()
    pageNum.value++
    return 25
  }
  return y
}

export function exportReportPDF(report: PeptideReport) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageNum = { value: 1 }
  let y = 20

  // ===== HEADER =====
  doc.setFontSize(22)
  doc.setTextColor(0, 180, 140)
  doc.text('Peptide Report', MARGIN, y)
  y += 8

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text('For Discussion With Your Healthcare Provider', MARGIN, y)
  y += 6

  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text(`Generated: ${report.generatedAt}`, MARGIN, y)
  y += 4

  // Divider
  doc.setDrawColor(200)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += SECTION_GAP

  // ===== PATIENT PROFILE =====
  doc.setFontSize(14)
  doc.setTextColor(40)
  doc.text('Patient Profile', MARGIN, y)
  y += 8

  const goalName = categoryMap[report.answers.primaryGoal]?.name ?? report.answers.primaryGoal
  const gender = report.answers.gender === 'other' ? 'Not specified' : report.answers.gender || 'Not specified'
  const age = report.answers.ageRange || 'Not specified'
  const focus = report.answers.specificFocus?.replace(/_/g, ' ') || 'General'
  const priorities = report.answers.priorities?.length
    ? report.answers.priorities.map((p) => p.replace(/_/g, ' ')).join(', ')
    : 'None selected'
  const flags = report.answers.situationFlags?.length
    ? report.answers.situationFlags.map((f) => f.replace(/_/g, ' ')).join(', ')
    : 'None'

  const profileRows = [
    ['Primary Goal', goalName],
    ['Age Range', age],
    ['Gender', gender],
    ['Specific Focus', focus],
    ['Priorities', priorities],
    ['Situation Flags', flags],
  ]

  doc.setFontSize(9)
  profileRows.forEach(([label, value]) => {
    doc.setTextColor(100)
    doc.text(`${label}:`, MARGIN, y)
    doc.setTextColor(40)
    doc.text(String(value), MARGIN + 40, y)
    y += LINE_HEIGHT
  })

  y += SECTION_GAP

  // ===== PEPTIDE RANKINGS =====
  doc.setFontSize(14)
  doc.setTextColor(40)
  doc.text('Peptide Rankings', MARGIN, y)
  y += 8

  const maxScore = report.allMatches[0]?.score ?? 1

  report.allMatches.forEach((result, i) => {
    y = checkPageBreak(doc, y, 14, pageNum)
    const pct = Math.round((result.score / maxScore) * 100)

    doc.setFontSize(10)
    doc.setTextColor(40)
    doc.text(`${i + 1}. ${result.peptide.name}`, MARGIN, y)

    doc.setTextColor(0, 180, 140)
    doc.text(`${pct}% match`, MARGIN + 80, y)

    if (result.peptide.fdaApproved) {
      doc.setTextColor(34, 197, 94)
      doc.text('FDA Approved', MARGIN + 110, y)
    }

    doc.setTextColor(100)
    doc.setFontSize(7)
    doc.text(`Risk: ${result.peptide.riskLevel}`, MARGIN + 140, y)

    y += 5
    doc.setFontSize(8)
    doc.setTextColor(120)
    const reasons = result.matchReasons.join(' · ')
    const reasonLines = doc.splitTextToSize(reasons, CONTENT_WIDTH)
    doc.text(reasonLines, MARGIN + 4, y)
    y += reasonLines.length * 4 + 3
  })

  y += SECTION_GAP

  // ===== RECOMMENDED STACKS =====
  if (report.recommendedStacks.length > 0) {
    y = checkPageBreak(doc, y, 20, pageNum)
    doc.setFontSize(14)
    doc.setTextColor(40)
    doc.text('Recommended Stacks', MARGIN, y)
    y += 8

    report.recommendedStacks.forEach((stack) => {
      y = checkPageBreak(doc, y, 20, pageNum)

      doc.setFontSize(10)
      doc.setTextColor(40)
      doc.text(stack.name, MARGIN, y)
      y += 5

      doc.setFontSize(8)
      doc.setTextColor(100)
      const descLines = doc.splitTextToSize(stack.description, CONTENT_WIDTH - 4)
      doc.text(descLines, MARGIN + 4, y)
      y += descLines.length * 4 + 2

      doc.setTextColor(0, 180, 140)
      doc.setFontSize(8)
      const peptideNames = stack.peptideIds
        .map((pid) => report.allMatches.find((m) => m.peptide.id === pid)?.peptide.name ?? pid)
        .join(', ')
      doc.text(`Peptides: ${peptideNames}`, MARGIN + 4, y)
      y += 4

      doc.setTextColor(120)
      doc.setFontSize(7)
      doc.text(stack.purpose, MARGIN + 4, y)
      y += 7
    })

    y += SECTION_GAP
  }

  // ===== DOSING PROTOCOL =====
  y = checkPageBreak(doc, y, 20, pageNum)
  doc.setFontSize(14)
  doc.setTextColor(40)
  doc.text('Dosing Protocol', MARGIN, y)
  y += 8

  report.dosingProtocol.forEach((entry, i) => {
    y = checkPageBreak(doc, y, 35, pageNum)

    doc.setFontSize(10)
    doc.setTextColor(40)
    doc.text(`${i + 1}. ${entry.peptideName}`, MARGIN, y)
    y += 6

    doc.setFontSize(8)
    const dosingDetails = [
      ['Dose', entry.dose],
      ['Method', entry.method],
      ['Frequency', entry.frequency],
      ['Cycle', entry.cycleLength],
    ]

    dosingDetails.forEach(([label, value]) => {
      doc.setTextColor(100)
      doc.text(`${label}:`, MARGIN + 4, y)
      doc.setTextColor(40)
      doc.text(String(value), MARGIN + 30, y)
      y += 5
    })

    // Protocol note
    doc.setFontSize(7)
    doc.setTextColor(0, 150, 120)
    const noteLines = doc.splitTextToSize(`Note: ${entry.experienceNote}`, CONTENT_WIDTH - 8)
    doc.text(noteLines, MARGIN + 4, y)
    y += noteLines.length * 3.5 + 2

    if (entry.notes) {
      doc.setTextColor(120)
      const notesLines = doc.splitTextToSize(entry.notes, CONTENT_WIDTH - 8)
      doc.text(notesLines, MARGIN + 4, y)
      y += notesLines.length * 3.5 + 2
    }

    y += 4
  })

  y += SECTION_GAP

  // ===== RISK ASSESSMENT =====
  y = checkPageBreak(doc, y, 20, pageNum)
  doc.setFontSize(14)
  doc.setTextColor(40)
  doc.text('Risk Assessment', MARGIN, y)
  y += 8

  report.riskAssessment.forEach((entry) => {
    y = checkPageBreak(doc, y, 25, pageNum)

    doc.setFontSize(10)
    doc.setTextColor(40)
    doc.text(`${entry.peptideName} — Risk Level: ${entry.riskLevel}`, MARGIN, y)
    y += 6

    const grouped = {
      serious: entry.sideEffects.filter((se) => se.severity === 'serious'),
      moderate: entry.sideEffects.filter((se) => se.severity === 'moderate'),
      mild: entry.sideEffects.filter((se) => se.severity === 'mild'),
    }

    const severityConfig = {
      serious: { label: 'SERIOUS', color: [220, 50, 50] as [number, number, number] },
      moderate: { label: 'MODERATE', color: [200, 150, 0] as [number, number, number] },
      mild: { label: 'MILD', color: [80, 130, 200] as [number, number, number] },
    }

    for (const severity of ['serious', 'moderate', 'mild'] as const) {
      const items = grouped[severity]
      if (items.length === 0) continue

      y = checkPageBreak(doc, y, 10, pageNum)
      const config = severityConfig[severity]

      doc.setFontSize(7)
      doc.setTextColor(...config.color)
      doc.text(`${config.label}:`, MARGIN + 4, y)

      doc.setFontSize(8)
      doc.setTextColor(80)
      const effectText = items.map((se) => se.text).join(', ')
      const effectLines = doc.splitTextToSize(effectText, CONTENT_WIDTH - 30)
      doc.text(effectLines, MARGIN + 24, y)
      y += effectLines.length * 4 + 2
    }

    y += 4
  })

  y += SECTION_GAP

  // ===== DOCTOR DISCUSSION GUIDE =====
  y = checkPageBreak(doc, y, 20, pageNum)
  doc.setFontSize(14)
  doc.setTextColor(40)
  doc.text('Doctor Discussion Guide', MARGIN, y)
  y += 3

  doc.setFontSize(8)
  doc.setTextColor(120)
  doc.text('Bring this list to your next appointment with your healthcare provider.', MARGIN, y)
  y += 7

  report.doctorGuide.forEach((point, i) => {
    y = checkPageBreak(doc, y, 10, pageNum)

    doc.setFontSize(9)
    doc.setTextColor(40)
    const lines = doc.splitTextToSize(`${i + 1}. ${point}`, CONTENT_WIDTH - 4)
    doc.text(lines, MARGIN + 2, y)
    y += lines.length * 4.5 + 2
  })

  y += SECTION_GAP

  // ===== CYCLE CALENDAR =====
  y = checkPageBreak(doc, y, 50, pageNum)
  doc.setFontSize(14)
  doc.setTextColor(40)
  doc.text('4-Week Cycle Calendar', MARGIN, y)
  y += 8

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const colWidth = CONTENT_WIDTH / 7

  report.cycleCalendar.forEach((week) => {
    y = checkPageBreak(doc, y, 25, pageNum)

    doc.setFontSize(9)
    doc.setTextColor(60)
    doc.text(`Week ${week.week}`, MARGIN, y)
    y += 5

    // Day headers
    doc.setFontSize(7)
    doc.setTextColor(100)
    days.forEach((day, i) => {
      doc.text(day, MARGIN + i * colWidth + colWidth / 2, y, { align: 'center' })
    })
    y += 4

    // Day content
    doc.setFontSize(6)
    week.days.forEach((d, i) => {
      const x = MARGIN + i * colWidth + 1
      if (d.peptides.length > 0) {
        d.peptides.forEach((p, pi) => {
          doc.setTextColor(0, 150, 120)
          const name = p.name.length > 12 ? p.name.substring(0, 12) + '..' : p.name
          doc.text(name, x, y + pi * 3.5)
        })
      } else {
        doc.setTextColor(180)
        doc.text('Rest', x, y)
      }
    })

    y += 12 + Math.max(...week.days.map((d) => d.peptides.length)) * 2
  })

  // Final footer
  addPageFooter(doc, pageNum.value)

  // Save
  doc.save('peptide-report.pdf')
}
