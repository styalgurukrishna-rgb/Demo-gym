import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Users, 
  Dumbbell, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  TrendingUp, 
  Sparkles, 
  Phone, 
  Save, 
  ShieldCheck, 
  ChevronRight,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { PageType, ModalState, MemberRecord, WorkoutPlan, ExerciseItem, BookingItem } from '../types';
import { leadStore } from '../services/leadStore';
import { soundManager } from '../components/common/SoundEffects';

interface TrainerDashboardPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const TrainerDashboardPage: React.FC<TrainerDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'members' | 'workouts' | 'schedule' | 'bookings'>('members');
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(null);

  // Workout Editor State
  const [editingWorkout, setEditingWorkout] = useState<WorkoutPlan | null>(null);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseMuscle, setNewExerciseMuscle] = useState('Chest / Triceps');
  const [newExerciseSets, setNewExerciseSets] = useState(4);
  const [newExerciseReps, setNewExerciseReps] = useState('10 - 12 reps');
  const [newExerciseWeight, setNewExerciseWeight] = useState(60);
  const [workoutSaveSuccess, setWorkoutSaveSuccess] = useState(false);

  // Trainer Availability State
  const [availableSlots, setAvailableSlots] = useState<{ [day: string]: string[] }>({
    'Monday - Friday': ['06:00 AM - 09:00 AM', '10:00 AM - 12:00 PM', '05:00 PM - 08:30 PM'],
    'Saturday': ['07:00 AM - 11:00 AM', '04:00 PM - 07:00 PM'],
    'Sunday': ['08:00 AM - 11:00 AM (VIP Special Only)']
  });

  useEffect(() => {
    const updateData = () => {
      const allMembers = leadStore.getMembers();
      setMembers(allMembers);
      if (allMembers.length > 0 && !selectedMember) {
        setSelectedMember(allMembers[0]);
      }

      const allBookings = leadStore.getBookings();
      setBookings(allBookings);

      const allWorkouts = leadStore.getWorkouts();
      setWorkouts(allWorkouts);
      if (allWorkouts.length > 0 && !editingWorkout) {
        setEditingWorkout(allWorkouts[0]);
      }
    };

    updateData();
    const unsub = leadStore.subscribe(updateData);
    return () => unsub();
  }, []);

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExerciseName || !editingWorkout) return;

    soundManager.playClick();
    const newEx: ExerciseItem = {
      id: `ex-${Date.now()}`,
      name: newExerciseName,
      targetMuscle: newExerciseMuscle,
      sets: Number(newExerciseSets),
      reps: newExerciseReps,
      targetWeightKg: Number(newExerciseWeight),
      completed: false,
      notes: 'Focus on full range of motion & controlled eccentric.'
    };

    const updated = {
      ...editingWorkout,
      exercises: [...editingWorkout.exercises, newEx]
    };

    setEditingWorkout(updated);
    leadStore.updateWorkout(updated);
    setNewExerciseName('');
    setWorkoutSaveSuccess(true);
    setTimeout(() => setWorkoutSaveSuccess(false), 2500);
  };

  const handleRemoveExercise = (exId: string) => {
    if (!editingWorkout) return;
    soundManager.playClick();
    const updated = {
      ...editingWorkout,
      exercises: editingWorkout.exercises.filter((e) => e.id !== exId)
    };
    setEditingWorkout(updated);
    leadStore.updateWorkout(updated);
  };

  const handleSaveWorkoutNotes = () => {
    if (!editingWorkout) return;
    soundManager.playSuccess();
    leadStore.updateWorkout(editingWorkout);
    setWorkoutSaveSuccess(true);
    setTimeout(() => setWorkoutSaveSuccess(false), 2500);
  };

  const handleApproveBooking = (id: string) => {
    soundManager.playSuccess();
    leadStore.updateBookingStatus(id, 'Approved');
  };

  const handleRejectBooking = (id: string) => {
    soundManager.playClick();
    leadStore.updateBookingStatus(id, 'Rejected');
  };

  const handleLogout = () => {
    soundManager.playClick();
    leadStore.logout();
    onNavigate('login');
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-6 relative z-10">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=300&q=80"
                alt="Coach Vikram"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-black rounded-lg text-[10px] font-black">
                CSCS
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-black uppercase tracking-wider">
                  Master Coach Portal
                </span>
                <span className="text-zinc-500 text-xs">• Active Shift</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
                Coach Vikram Singhania
              </h1>
              <p className="text-xs text-zinc-400">
                Head of Biomechanics & Transformation • 14 Assigned Athletes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto relative z-10">
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase transition-colors"
            >
              Switch to CRM
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
          {[
            { id: 'members', label: 'Assigned Athletes', count: members.length, icon: Users },
            { id: 'workouts', label: 'Workout Plan Builder', icon: Dumbbell },
            { id: 'bookings', label: 'Session Bookings', count: bookings.filter(b => b.status === 'Pending').length, icon: Calendar },
            { id: 'schedule', label: 'Schedule & Availability', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-black text-amber-400' : 'bg-zinc-800 text-zinc-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: Assigned Members */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Active Client Roster ({members.length})
                </h3>
                <span className="text-xs text-zinc-500">Updated Real-Time</span>
              </div>

              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedMember(member);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      selectedMember?.id === member.id
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-lg'
                        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{member.name}</h4>
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase">
                            {member.planName}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{member.phone} • {member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase text-zinc-500 block">Adherence</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">92% On-Track</span>
                      </div>
                      <a
                        href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                        title="Direct WhatsApp Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Member Quick View Card */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Athlete Profile Dossier
              </h3>
              {selectedMember ? (
                <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                    <img
                      src={selectedMember.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                      alt={selectedMember.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-amber-500/40"
                    />
                    <div>
                      <h4 className="text-base font-black text-white">{selectedMember.name}</h4>
                      <p className="text-xs text-amber-400 font-bold">{selectedMember.planName}</p>
                      <p className="text-[11px] text-zinc-500">Joined {selectedMember.startDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 block">Current Weight</span>
                      <span className="text-sm font-black text-white font-mono">78.4 kg</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 block">Target Weight</span>
                      <span className="text-sm font-black text-amber-400 font-mono">80.0 kg</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 block">Body Fat %</span>
                      <span className="text-sm font-black text-emerald-400 font-mono">11.8%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 block">Biometric Scans</span>
                      <span className="text-sm font-black text-white font-mono">3 Completed</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase text-zinc-400">Assigned Training Focus</span>
                    <p className="text-xs text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                      Hypertrophy phase with periodized progressive overload. Special focus on upper chest volume and deltoid density.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('workouts');
                    }}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>EDIT WORKOUT SPLIT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center text-zinc-500 text-xs">
                  Select a member to view their training dossier.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Workout Plan Builder */}
        {activeTab === 'workouts' && editingWorkout && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Routine Header */}
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      Active Split for {editingWorkout.memberName}
                    </span>
                    <h3 className="text-lg font-black text-white uppercase mt-0.5">
                      {editingWorkout.dayTitle}
                    </h3>
                  </div>
                  <button
                    onClick={handleSaveWorkoutNotes}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>SAVE ROUTINE</span>
                  </button>
                </div>

                {workoutSaveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Workout Routine updated in Member Dashboard!</span>
                  </div>
                )}

                {/* Trainer Notes Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Coaching Cues & Tempo Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={editingWorkout.trainerNotes}
                    onChange={(e) => setEditingWorkout({ ...editingWorkout, trainerNotes: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    placeholder="Enter tempo, rest periods, or hydration instructions..."
                  />
                </div>
              </div>

              {/* Exercise List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Assigned Exercise Protocol ({editingWorkout.exercises.length})
                </h4>

                {editingWorkout.exercises.map((ex, index) => (
                  <div
                    key={ex.id}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-zinc-950 border border-zinc-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div>
                        <h5 className="text-sm font-bold text-white">{ex.name}</h5>
                        <p className="text-xs text-zinc-400">{ex.targetMuscle} • {ex.sets} Sets × {ex.reps}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between sm:justify-end">
                      <div className="text-right font-mono text-xs">
                        <span className="text-[10px] text-zinc-500 block uppercase">Target Load</span>
                        <span className="font-bold text-amber-400">{ex.targetWeightKg} kg</span>
                      </div>
                      <button
                        onClick={() => handleRemoveExercise(ex.id)}
                        className="p-2 rounded-xl bg-zinc-950 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove Exercise"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Exercise Panel */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 h-fit">
              <div className="flex items-center gap-2 text-amber-400">
                <Plus className="w-4 h-4" />
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Add Exercise Movement
                </h4>
              </div>

              <form onSubmit={handleAddExercise} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Incline Dumbbell Press"
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                    Target Muscle Group
                  </label>
                  <select
                    value={newExerciseMuscle}
                    onChange={(e) => setNewExerciseMuscle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Chest / Pectorals">Chest / Pectorals</option>
                    <option value="Back / Lats & Rhomboids">Back / Lats & Rhomboids</option>
                    <option value="Shoulders / Deltoids">Shoulders / Deltoids</option>
                    <option value="Arms / Biceps & Triceps">Arms / Biceps & Triceps</option>
                    <option value="Legs / Quads & Hamstrings">Legs / Quads & Hamstrings</option>
                    <option value="Core & Posterior Chain">Core & Posterior Chain</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                      Sets
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={newExerciseSets}
                      onChange={(e) => setNewExerciseSets(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={newExerciseWeight}
                      onChange={(e) => setNewExerciseWeight(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">
                    Rep Scheme
                  </label>
                  <input
                    type="text"
                    value={newExerciseReps}
                    onChange={(e) => setNewExerciseReps(e.target.value)}
                    placeholder="e.g. 8 - 10 reps (Drop set)"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD TO WORKOUT</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: Session Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Trial & Personal Training Bookings ({bookings.length})
            </h3>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{booking.id}</span>
                      <h4 className="text-sm font-bold text-white">{booking.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        booking.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : booking.status === 'Rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Goal: <span className="text-white font-semibold">{booking.fitnessGoal}</span> • {booking.date} ({booking.timeSlot})
                    </p>
                    <p className="text-[11px] text-zinc-500">{booking.phone} • {booking.email}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {booking.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApproveBooking(booking.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase flex items-center gap-1.5 hover:bg-emerald-400 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="px-3.5 py-2 rounded-xl bg-red-500/20 text-red-400 font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-red-500/30 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </>
                    )}
                    <a
                      href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-emerald-400 transition-colors"
                      title="Send WhatsApp Confirmation"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Schedule & Availability */}
        {activeTab === 'schedule' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div>
              <h3 className="text-base font-black text-white uppercase">
                Coach Vikram's Weekly Floor & PT Schedule
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Configure your available personal training slots for member self-booking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(availableSlots).map(([day, slots]) => (
                <div key={day} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-xs font-black uppercase text-amber-400">{day}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Open</span>
                  </div>
                  <div className="space-y-1.5">
                    {(slots as string[]).map((s, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-zinc-900 text-xs text-zinc-300 font-mono flex items-center justify-between">
                        <span>{s}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrainerDashboardPage;
