declare namespace FC {

    namespace EndWeek {
        interface FacilityReport {
            before: Node,
            slaves: Array<SlaveReport>,
            after: Node,
        }

        interface SlaveReport {
            id: number,
            report: Node,
        }
    }

}
