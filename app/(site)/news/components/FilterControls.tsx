'use client'

import { useState } from 'react'
import styles from './FilterControls.module.css'

export type DateFilter = 'all' | 'custom'

interface FilterControlsProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  dateFilter: DateFilter
  onDateFilterChange: (filter: DateFilter) => void
  customDateRange: { start: string; end: string }
  onCustomDateRangeChange: (range: { start: string; end: string }) => void
  totalResults: number
}

export default function FilterControls({
  searchTerm,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  customDateRange,
  onCustomDateRangeChange,
  totalResults
}: FilterControlsProps) {
  const handleDateFilterChange = (filter: DateFilter) => {
    onDateFilterChange(filter)
  }

  const handleCustomDateChange = (field: 'start' | 'end', value: string) => {
    const newRange = { ...customDateRange, [field]: value }
    onCustomDateRangeChange(newRange)
  }

  const clearFilters = () => {
    onSearchChange('')
    onDateFilterChange('all')
    onCustomDateRangeChange({ start: '', end: '' })
  }

  const hasActiveFilters = searchTerm || dateFilter !== 'all'

  return (
    <div className={styles.filterControls}>
      <div className={styles.filterHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.filterTitle}>News & Updates</h3>
          <div className={styles.resultsCount}>
            {totalResults} {totalResults === 1 ? 'article' : 'articles'}
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className={styles.clearFiltersButton}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      <div className={styles.filterRow}>
        {/* Search Input */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <svg 
              className={styles.searchIcon} 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className={styles.clearSearchButton}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Date Range Toggle */}
        <div className={styles.dateRangeToggle}>
          <button
            onClick={() => handleDateFilterChange(dateFilter === 'custom' ? 'all' : 'custom')}
            className={`${styles.dateRangeButton} ${dateFilter === 'custom' ? styles.active : ''}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Filter by Date
          </button>
        </div>
      </div>

      {/* Custom Date Range Picker */}
      {dateFilter === 'custom' && (
        <div className={styles.customDateRange}>
          <div className={styles.dateRangeInputs}>
            <div className={styles.dateInputGroup}>
              <label htmlFor="startDate" className={styles.dateLabel}>From</label>
              <input
                id="startDate"
                type="date"
                value={customDateRange.start}
                onChange={(e) => handleCustomDateChange('start', e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label htmlFor="endDate" className={styles.dateLabel}>To</label>
              <input
                id="endDate"
                type="date"
                value={customDateRange.end}
                onChange={(e) => handleCustomDateChange('end', e.target.value)}
                className={styles.dateInput}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
