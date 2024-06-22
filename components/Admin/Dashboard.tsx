'use client'

import { useEffect, useState } from 'react'
import { TGourmet, TMarche } from '@/types'
import Link from 'next/link'
import { DeleteButton } from '../Button/DeleteButton'
import styles from './styles.module.css'
import Image from 'next/image'
import { FiEdit } from 'react-icons/fi'

const Dashboard = () => {
  const [gourmets, setGourmets] = useState<TGourmet[]>([])
  const [marches, setMarches] = useState<TMarche[]>([])

  useEffect(() => {
    const fetchAllGourmets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/gourmets`
        )
        if (res.ok) {
          const data = await res.json()
          setGourmets(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllGourmets()
  }, [])

  useEffect(() => {
    const fetchAllMarches = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/marches`
        )
        if (res.ok) {
          const data = await res.json()
          setMarches(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllMarches()
  }, [])

  const handleToDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ((date.getMonth() % 12) + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  const groupedGourmets = gourmets.reduce((acc, gourmet) => {
    const category = gourmet.category?.catName || 'Unknown Category'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(gourmet)
    return acc
  }, {} as Record<string, TGourmet[]>)

  const groupedMarches = marches.reduce((acc, marche) => {
    const category = marche.category?.catName || 'Unknown Category'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(marche)
    return acc
  }, {} as Record<string, TMarche[]>)

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardContainer}>
        <div className={styles.MarcheContainer}>
          <div>
            <h2>Sushi Marche</h2>
          </div>
          {Object.entries(groupedMarches).map(([category, marches]) => (
            <div key={category} className={styles.container}>
              <h2>{category}</h2>
              <table className={styles.table}>
                <colgroup>
                  <col style={{ width: '45%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className={styles.table_header}>Title</th>
                    <th className={styles.table_header}>Price</th>
                    <th className={styles.table_header}>Updated</th>
                    <th className={styles.table_header}></th>
                  </tr>
                </thead>
                <tbody>
                  {marches.map((marche) => (
                    <tr key={marche._id}>
                      <td className={styles.table_detail}>{marche.title.en}</td>
                      <td className={styles.table_detail}>
                        {marche.price &&
                          parseFloat(marche.price).toFixed(2).replace('.', ',')}
                      </td>
                      <td className={styles.table_detail}>
                        {marche.updatedAt && handleToDate(marche.updatedAt)}
                      </td>
                      <td className={styles.table_detail}>
                        <div className="flex justify-around flex-wrap">
                          <Link href={`/admin/edit-marcheMenu/${marche._id}`}>
                            <FiEdit className={styles.editButton} />
                          </Link>
                          <DeleteButton
                            id={marche._id}
                            publicId={marche?.imageData?.[0]?.publicId}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className={styles.GourmetContainer}>
          <div>
            <h2>Sushi Gourmet</h2>
          </div>
          {Object.entries(groupedGourmets).map(([category, gourmets]) => (
            <div key={category} className={styles.container}>
              <h2>{category}</h2>
              <table className={styles.table}>
                <colgroup>
                  <col style={{ width: '45%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className={styles.table_header}>Title</th>
                    <th className={styles.table_header}>Price</th>
                    <th className={styles.table_header}>Updated</th>
                    <th className={styles.table_header}></th>
                  </tr>
                </thead>
                <tbody>
                  {gourmets.map((gourmet) => (
                    <tr key={gourmet._id}>
                      <td className={styles.table_detail}>
                        {gourmet.title.en}
                      </td>
                      <td className={styles.table_detail}>
                        {gourmet.price &&
                          parseFloat(gourmet.price)
                            .toFixed(2)
                            .replace('.', ',')}
                      </td>
                      <td className={styles.table_detail}>
                        {gourmet.updatedAt && handleToDate(gourmet.updatedAt)}
                      </td>
                      <td className={styles.table_detail}>
                        <div className="flex justify-around flex-wrap">
                          <Link href={`/admin/edit-gourmetMenu/${gourmet._id}`}>
                            <FiEdit className={styles.editButton} />
                          </Link>
                          <DeleteButton
                            id={gourmet._id}
                            publicId={gourmet?.imageData?.[0]?.publicId}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
