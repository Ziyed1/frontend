import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//components - Template pour les documents
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    // Sert a gérer les effets de bord, et peut effectuer des tâches comme charger des données ou autre.
    useEffect(() => {
        const fetchWorkouts = async () => {
            // fetch = GET par défaut
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    // Utilisation du template
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home